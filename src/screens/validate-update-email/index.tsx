import { useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { colors } from '@/styles/theme'
import { styles } from './styles'
import { ValidateUserUpdateEmail } from '@/services/http/user/validate-user-update-email'

export function ValidateUpdateEmailScreen() {
  const { token } = useLocalSearchParams()

  useEffect(() => {
    const validateEmail = async () => {
      console.log("Validate token: "+ token)
      try {
        const response = await ValidateUserUpdateEmail(token as string)
        console.log(response)
        router.navigate('/profile')
      } catch (error) {
        console.log(error)
        alert('Token inválido ou expirado.')
        router.navigate('/')
      }
    }
    validateEmail()
  }, [token])

  return (
    <View style={styles.container}>
      <ActivityIndicator size={48} color={colors.lime[500]} />
      <Text style={styles.text}>Validando novo e-mail...</Text>
    </View>
  )
}
