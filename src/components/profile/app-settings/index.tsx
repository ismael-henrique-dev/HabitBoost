import { Text, View } from 'react-native'
import { IconBell, IconCloud } from '@tabler/icons-react-native'
import { SettingItem } from './setting-item'
import { styles } from './styles'
import { useSettings } from '@/hooks/use-settings'

export function AppSettings() {
  const { settings, updateSetting } = useSettings()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações do app</Text>

      <SettingItem
        icon={IconBell}
        label='Receber lembretes'
        value={settings.reminders}
        onValueChange={() => updateSetting('reminders', !settings.reminders)}
      />

      <SettingItem
        icon={IconCloud}
        label='Mostrar widget de clima'
        value={settings.weatherWidget}
        onValueChange={() =>
          updateSetting('weatherWidget', !settings.weatherWidget)
        }
      />
    </View>
  )
}
