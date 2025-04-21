import { colors } from '@/styles/theme'
import { IconFilter, IconPlus } from '@tabler/icons-react-native'
import { TouchableOpacity, View, Text } from 'react-native'
import { styles } from './styles'
import { router } from 'expo-router'
import { useNotifications } from 'react-native-notificated'

export function HeaderHomeActions() {
  const { notify } = useNotifications()

  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={() =>
        notify('custom', {
          params: {
            customTitle: 'The best Doughnuts in Krakow',
            type: 'success'
          },
          config: {
            duration: 2000,
          },
        })
      }
        style={styles.filterButton}
      >
        <IconFilter size={24} color={colors.zinc[900]} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.navigate('/create-habit')}
        style={styles.newButton}
      >
        <Text style={styles.newButtonText}>Novo</Text>
        <IconPlus size={24} color={colors.zinc[900]} />
      </TouchableOpacity>
    </View>
  )
}
