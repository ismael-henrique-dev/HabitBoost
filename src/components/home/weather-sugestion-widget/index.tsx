import { colors } from '@/styles/theme'
import {
  IconExclamationCircle,
  IconSun,
  IconX,
} from '@tabler/icons-react-native'
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from 'react-native'
import { styles } from './styles'
import * as Location from 'expo-location'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getSuggestionByWeather } from '@/utils/get-suggestion-by-weather'
import { translateWeather } from '@/utils/translate-weather'
import { useSettings } from '@/hooks/use-settings'

type WeatherData = {
  weather: { main: string; description: string }[]
  main: { temp: number }
}

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_URL

export function WeatherSuggestionWidget() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [permissionLocationStatus, setPermissionLocationStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const { settings, updateSetting } = useSettings()
  const opacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.4,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start()
    }
  }, [loading, opacity])

  // Atualizada para salvar clima, localização e timestamp
  async function getWeatherCurrentStatus(lat: number, lon: number) {
    setLoading(true)
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
      )
      setWeather(response.data)
      await AsyncStorage.setItem(
        '@weatherData',
        JSON.stringify({
          weather: response.data,
          timestamp: Date.now(),
          location: { lat, lon },
        })
      )
    } catch (error) {
      console.error('Erro ao obter clima:', error)
    }
    setLoading(false)
  }

  // Só pede permissão se nunca foi salva
  async function getCurrentLocation() {
    setLoading(true)
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('', 'Permissão negada.')
      setLoading(false)
      return
    }

    await AsyncStorage.setItem('@locationStatus', status)
    let loc = await Location.getCurrentPositionAsync({})
    setLocation(loc)
    setLoading(false)
  }

  // Carrega clima salvo e só busca se necessário E se o widget estiver ativo
  useEffect(() => {
    async function loadWeatherFromStorage() {
      if (!settings.weatherWidget) return

      const storedPermissionLocationStatus = await AsyncStorage.getItem(
        '@locationStatus'
      )
      if (storedPermissionLocationStatus) {
        setPermissionLocationStatus(storedPermissionLocationStatus)
      }

      const storedWeather = await AsyncStorage.getItem('@weatherData')
      if (storedWeather) {
        const { weather, timestamp, location } = JSON.parse(storedWeather)
        // 30 minutos = 1800000 ms
        if (Date.now() - timestamp < 1800000) {
          setWeather(weather)
          setLocation({
            coords: {
              latitude: location.lat,
              longitude: location.lon,
            },
          } as any)
          return
        }
        // Se passou do tempo, busca novamente
        if (location) {
          getWeatherCurrentStatus(location.lat, location.lon)
        }
      }
    }
    loadWeatherFromStorage()
  }, [settings.weatherWidget])

  // Se a localização mudar, busca clima e salva, mas só se o widget estiver ativo
  useEffect(() => {
    if (settings.weatherWidget && location) {
      const { latitude, longitude } = location.coords
      getWeatherCurrentStatus(latitude, longitude)
    }
  }, [location, settings.weatherWidget])

  // Skeleton animado enquanto carrega permissão ou clima
  if (loading) {
    return (
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: colors.zinc[200], opacity },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerGroup}>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: '#d0d0d0',
              }}
            />
            <View
              style={{
                width: 120,
                height: 18,
                backgroundColor: '#d0d0d0',
                borderRadius: 4,
                marginLeft: 8,
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 18,
            backgroundColor: '#d0d0d0',
            borderRadius: 4,
            marginTop: 12,
          }}
        />
      </Animated.View>
    )
  }

  if (permissionLocationStatus === 'granted' && weather) {
    const clima = weather.weather[0].main
    const sugestao = getSuggestionByWeather(clima)

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.lime[500],
          },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerGroup}>
            {clima && <IconSun size={24} color={colors.zinc[50]} />}
            <Text style={styles.title}>{translateWeather(clima)}</Text>
          </View>
        </View>
        <Text style={styles.description}>{sugestao}</Text>
      </View>
    )
  }

  // Só pede permissão se nunca foi salva
  return (
    <TouchableOpacity
      onPress={() => {
        if (!permissionLocationStatus) {
          getCurrentLocation()
        }
      }}
      style={[
        styles.container,
        {
          backgroundColor: colors.red[600],
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerGroup}>
          <IconExclamationCircle size={24} color={colors.zinc[50]} />
          <Text style={styles.title}>{'Sugestões baseadas no clima'}</Text>
        </View>
        <TouchableOpacity onPress={() => updateSetting('weatherWidget', false)}>
          <IconX size={24} color={colors.zinc[50]} />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>
        Para ver atividades recomendadas de acordo com o clima, permita o acesso
        à sua localização.
      </Text>
    </TouchableOpacity>
  )
}
