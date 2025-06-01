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

  async function logout() {
    const token = await AsyncStorage.getItem('@token')

    if(token) {
      await AsyncStorage.removeItem('@token')
    }
  }

  return {
    isLogged,
    setIsLogged,
    logout
  }
}
