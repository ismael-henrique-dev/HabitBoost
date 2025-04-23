import { colors } from '@/styles/theme'
import { IconExclamationCircle, IconX } from '@tabler/icons-react-native'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import axios from 'axios'

type WeatherSuggestionWidgetProps = {
  title: string
  description: string
  variant?: 'default' | 'warning'
  icon?: React.ElementType
}

type WeatherData = {
  weather: { main: string; description: string }[]
  main: { temp: number }
}

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_URL 

export function WeatherSuggestionWidget({
  variant = 'default',
  title,
  description,
  icon: Icon,
}: WeatherSuggestionWidgetProps) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      Alert.alert('', 'Permissão negada.')
      return
    }

    let loc = await Location.getCurrentPositionAsync({})
    setLocation(loc)
  }

  async function getWeatherCurrentStatus(lat: number, lon: number) {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt`
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

  if (location && weather) {
    const clima = weather.weather[0].main.toLowerCase()
    const sugestao =
      clima.includes('clear')
        ? 'Está um lindo dia lá fora! Que tal uma corrida no parque?'
        : clima.includes('rain')
        ? 'Está chovendo, talvez seja melhor ficar em casa e assistir um filme.'
        : 'O clima está neutro. Que tal uma caminhada leve?'

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
            {Icon && <Icon size={24} color={colors.zinc[50]} />}
            <Text style={styles.title}>{title}</Text>
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
          backgroundColor:
            variant === 'warning' ? colors.red[600] : colors.lime[500],
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerGroup}>
          {Icon && <Icon size={24} color={colors.zinc[50]} />}
          {variant === 'warning' && !Icon && (
            <IconExclamationCircle size={24} color={colors.zinc[50]} />
          )}
          <Text style={styles.title}>
            {variant === 'warning' ? 'Sugestões baseadas no clima' : title}
          </Text>
        </View>
        {variant === 'warning' && <IconX size={24} color={colors.zinc[50]} />}
      </View>
      <Text style={styles.description}>
        {variant === 'warning'
          ? 'Para ver atividades recomendadas de acordo com o clima, permita o acesso à sua localização.'
          : description}
      </Text>
    </TouchableOpacity>
  )
}
