import { useContext } from 'react'
import { SettingsContext } from '@/contexts/settings-context'

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings should used in SettingsProvider')
  }
  return context
}
