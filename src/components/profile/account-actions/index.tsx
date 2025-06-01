import { Text, View } from 'react-native'
import { IconLogout, IconTrash, IconUserEdit } from '@tabler/icons-react-native'
import { ActionItem } from './action-item'
import { styles } from './styles'
import { router } from 'expo-router'
import { useAuth } from '@/hooks/use-auth'

export function AccountActions() {
  const { setIsLogged, logout } = useAuth()

  async function hableLogout() {
    await logout()
    setIsLogged(false)
    router.navigate('/login')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conta</Text>

      <ActionItem icon={IconUserEdit} label='Alterar dados cadastrais' />
      <ActionItem icon={IconTrash} label='Deletar conta' />
      <ActionItem icon={IconLogout} label='Logout' onPress={hableLogout} />
    </View>
  )
}
