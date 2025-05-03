import { ScrollView, View } from 'react-native'
import { styles } from './styles'
import { UserInfoCard } from '@/components/profile/user-info-card'
import { AppSettings } from '@/components/profile/app-settings'
import { AccountActions } from '@/components/profile/account-actions'
import { WarningCard } from '@/components/ui/warning-card'

export default function ProfileScreen() {
  const isLogged = true

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View style={styles.container}>
        {isLogged && <UserInfoCard />}
        <AppSettings />
        {isLogged ? (
          <AccountActions />
        ) : (
          <WarningCard warningMessage='Para salvar suas configurações e acessar o perfil em diferentes dispositivos, faça login com sua conta.' />
        )}
      </View>
    </ScrollView>
  )
}
