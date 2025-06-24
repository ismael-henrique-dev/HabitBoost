import { useContext } from 'react'
import { SettingsContext } from '@/contexts/settings-context'

// jogar no context novamente

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings should used in SettingsProvider')
  }
  return context
}
