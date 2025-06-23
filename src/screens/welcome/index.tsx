import { Text, View, Image } from 'react-native'
import { router } from 'expo-router'
import { colors } from '@/styles/theme'
import { Steps } from '@/components/welcome/steps'
import { Button } from '@/components/ui'
import { styles } from './styles'

export function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/logo.png')}
        />
      </View>
      <Text style={styles.title}>Seja bem-vindo(a) ao HabitBoost!</Text>
      <Text style={styles.description}>
        Transforme sua rotina e acompanhe seu progresso com a melhor experiência
        possível.
      </Text>
      <Steps />
      <Button variant='secundary' onPress={() => router.navigate('/')}>
        <Button.Title style={{ color: colors.zinc[50] }}>Começar</Button.Title>
      </Button>
    </View>
  )
}

