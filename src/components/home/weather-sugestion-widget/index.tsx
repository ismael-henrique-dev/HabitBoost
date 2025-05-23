import { colors } from '@/styles/theme'
import {
  IconExclamationCircle,
  IconSun,
  IconX,
} from '@tabler/icons-react-native'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
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
  const { settings, updateSetting } = useSettings()

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync()
    console.log(status)
    if (status !== 'granted') {
      Alert.alert('', 'Permissão negada.')
      return
    }

    await AsyncStorage.setItem('@locationStatus', status)
    let loc = await Location.getCurrentPositionAsync({})

    setLocation(loc)
  }

  async function getWeatherCurrentStatus(lat: number, lon: number) {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
      )
      setWeather(response.data)
    } catch (error) {
      console.error('Erro ao obter clima:', error)
    }
  }

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location.coords
      getWeatherCurrentStatus(latitude, longitude)
    }
    console.log(weather)
  }, [location])

  useEffect(() => {
    async function getStoredLocationPermition() {
      const storedPermissionLocationStatus = await AsyncStorage.getItem(
        '@locationStatus'
      )
      if (storedPermissionLocationStatus) {
        setPermissionLocationStatus(storedPermissionLocationStatus)
      }
    }

    getStoredLocationPermition()
  }, [])

  // vou melhorar isso

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

  return (
    <TouchableOpacity
      onPress={getCurrentLocation}
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
