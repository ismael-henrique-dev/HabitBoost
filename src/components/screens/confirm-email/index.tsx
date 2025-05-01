import { useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { api } from '@/services/api'
import { colors } from '@/styles/theme'
import { styles } from './styles'

export function ConfirmEmailScreen() {
  const { token } = useLocalSearchParams()

  useEffect(() => {
    if (token) {
      console.log(token)

      api
        .patch('auth/validate/verifyToken', { token })
        .then(() => {
          alert('E-mail confirmado com sucesso!')
          console.log(token)
          router.navigate('/welcome')
        })
        .catch(() => {
          alert('Token inválido ou expirado.')
          console.log(token)
          router.navigate('/')
        })
    }
  }, [token])

  return (
    <View style={styles.container}>
      <ActivityIndicator size={48} color={colors.lime[500]} />
      <Text style={styles.text}>Confirmando e-mail...</Text>
    </View>
  )
}
