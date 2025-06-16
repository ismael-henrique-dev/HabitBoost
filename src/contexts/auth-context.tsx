
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type AuthContextType = {
  isLogged: boolean
  logout: () => Promise<void>
  setIsLogged: (value: boolean) => void
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('@token')
      setIsLogged(!!token)
    }

    checkToken()
  }, [])

  async function logout() {
    await AsyncStorage.removeItem('@token')
    await AsyncStorage.clear()
    setIsLogged(false)
  }

  return (
    <AuthContext.Provider value={{ isLogged, logout, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
