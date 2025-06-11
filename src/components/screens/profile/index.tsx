import { ScrollView, View } from 'react-native'
import { styles } from './styles'
import { UserInfoCard } from '@/components/profile/user-info-card'
import { AppSettings } from '@/components/profile/app-settings'
import { AccountActions } from '@/components/profile/account-actions'
import { WarningCard } from '@/components/ui/warning-card'
import { Button } from '@/components/ui'
import { colors } from '@/styles/theme'
import { router } from 'expo-router'
import { useAuth } from '@/contexts/auth-context'

export default function ProfileScreen() {
  const { isLogged } = useAuth()

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View style={styles.container}>
        {isLogged && <UserInfoCard isLogged={isLogged} />}
        <AppSettings />
        {isLogged ? (
          <AccountActions />
        ) : (
          <View>
            <WarningCard warningMessage='Para salvar suas configurações e acessar o perfil em diferentes dispositivos, faça login com sua conta.' />
            <Button
              onPress={() => router.navigate('/login')}
              variant='secundary'
              style={{ marginTop: 20 }}
            >
              <Button.Title
                style={{
                  color: colors.zinc[50],
                }}
              >
                Fazer login
              </Button.Title>
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  )
}
