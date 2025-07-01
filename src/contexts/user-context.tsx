import { createContext, useContext, useEffect, useState } from 'react'
import { getProfile } from '@/services/http/user/get-profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getErrorMessage } from '@/utils/get-error-menssage'
import { useAuth } from './auth-context'

type UserData = Awaited<ReturnType<typeof getProfile>> | null

type UserContextType = {
  userData: UserData
  isLoading: boolean
  refreshUserData: () => Promise<void>
  setUserData: (data: UserData) => void
}

const UserContext = createContext({} as UserContextType)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isLogged } = useAuth()

  async function refreshUserData() {
    try {
      setIsLoading(true)
      const response = await getProfile()
      if (response) {
        setUserData(response)
        await AsyncStorage.setItem('@userData', JSON.stringify(response))
      }
    } catch (responseError) {
      const error = getErrorMessage(responseError)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isLogged) {
      refreshUserData()
    }
  }, [isLogged])

  return (
    <UserContext.Provider
      value={{ isLoading, userData, refreshUserData, setUserData }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
