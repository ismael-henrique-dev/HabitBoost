import { View, Text } from 'react-native'
import { Image } from 'react-native'
import { styles } from './styles'
import { Button } from '@/components/ui'
import { colors } from '@/styles/theme'
import { router } from 'expo-router'

export function AccountActivationScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
        <View style={styles.subContainer}>
          <Text style={styles.title}>Ativação da conta</Text>
          <Text style={styles.subTitle}>
            Enviamos um e-mail para você! Clique no botão “Ativar Conta” para
            acessar o aplicativo novamente.
          </Text>
          <Button variant='secundary' onPress={() => router.navigate('/login')}>
            <Button.Title
              style={{
                color: colors.zinc[50],
                width: '100%',
                textAlign: 'center',
              }}
            >
              Ir para tela de login
            </Button.Title>
          </Button>
        </View>
      </View>
    </View>
  )
}
