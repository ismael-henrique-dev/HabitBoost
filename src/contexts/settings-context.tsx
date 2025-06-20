import { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Settings = {
  reminders: boolean
  weatherWidget: boolean
  firstTimeUser: boolean
  
}

type SettingsContextType = {
  settings: Settings
  updateSetting: <T extends keyof Settings>(key: T, value: Settings[T]) => void
  isLoaded: boolean
}

const defaultSettings: Settings = {
  reminders: true,
  weatherWidget: true,
  firstTimeUser: true,
}

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('@app_settings').then((stored) => {
      if (stored) {
        setSettings(JSON.parse(stored))
      } else {
        // Se for a primeira vez, salva a configuração inicial
        AsyncStorage.setItem('@app_settings', JSON.stringify(defaultSettings))
      }
      setIsLoaded(true)
    })
  }, [])

  const updateSetting = async <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    const updated = { ...settings, [key]: value }
    setSettings(updated)
    await AsyncStorage.setItem('@app_settings', JSON.stringify(updated))
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, isLoaded }}>
      {children}
    </SettingsContext.Provider>
  )
}
