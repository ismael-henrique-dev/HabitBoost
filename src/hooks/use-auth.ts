import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export function useAuth() {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('@token')
      setIsLogged(!!token)
    }

    checkToken()
  }, [])

  return {
    isLogged,
  }
}
