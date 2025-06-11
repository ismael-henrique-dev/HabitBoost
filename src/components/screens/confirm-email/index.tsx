import { useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { api } from '@/services/api'
import { colors } from '@/styles/theme'
import { styles } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'


type ConfirmEmailResponse = {
  token: string
}

export function ConfirmEmailScreen() {
  const { token } = useLocalSearchParams()

  useEffect(() => {
    async function confirmEmail() {
      if (!token) return

      try {
       
        const response = await api.patch<ConfirmEmailResponse>('auth/validate/verifyToken', { token })
        alert('E-mail confirmado com sucesso!')
        await AsyncStorage.setItem('@token', response.data.token as string)
        router.navigate('/welcome')
      } catch (error) {
        console.log(token)
        alert('Token inválido ou expirado.')
        router.navigate('/')
      }
    }

    confirmEmail()
  }, [token])

  return (
    <View style={styles.container}>
      <ActivityIndicator size={48} color={colors.lime[500]} />
      <Text style={styles.text}>Confirmando e-mail...</Text>
    </View>
  )
}
