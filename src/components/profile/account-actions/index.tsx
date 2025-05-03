import { Text, View } from 'react-native'
import { IconLogout, IconTrash, IconUserEdit } from '@tabler/icons-react-native'
import { ActionItem } from './action-item'
import { styles } from './styles'
import { router } from 'expo-router'

export function AccountActions() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conta</Text>

      <ActionItem icon={IconUserEdit} label='Alterar dados cadastrais' />
      <ActionItem icon={IconTrash} label='Deletar conta' />
      <ActionItem icon={IconLogout} label='Logout' onPress={() => router.navigate('/login')} />
    </View>
  )
}
