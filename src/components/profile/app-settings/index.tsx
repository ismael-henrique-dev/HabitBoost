import { useState } from 'react'
import { Text, View } from 'react-native'
import { IconBell, IconCloud } from '@tabler/icons-react-native'
import { SettingItem } from './setting-item'
import { styles } from './styles'

export function AppSettings() {
  const [isRemindersOn, setIsRemindersOn] = useState(true)
  const [isWeatherWidgetOn, setIsWeatherWidgetOn] = useState(true)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações do app</Text>

      <SettingItem
        icon={IconBell}
        label='Receber lembretes'
        value={isRemindersOn}
        onValueChange={() => setIsRemindersOn(!isRemindersOn)}
      />

      <SettingItem
        icon={IconCloud}
        label='Mostrar widget de clima'
        value={isWeatherWidgetOn}
        onValueChange={() => setIsWeatherWidgetOn(!isWeatherWidgetOn)}
      />
    </View>
  )
}
