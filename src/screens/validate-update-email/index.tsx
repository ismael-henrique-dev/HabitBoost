import { useEffect } from 'react'
import { ActivityIndicator, Text, ToastAndroid, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { colors } from '@/styles/theme'
import { styles } from './styles'
import { ValidateUserUpdateEmail } from '@/services/http/user/validate-user-update-email'
import { useUser } from '@/contexts/user-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getErrorMessage } from '@/utils/get-error-menssage'

export function ValidateUpdateEmailScreen() {
  const { token } = useLocalSearchParams()
  const { userData, setUserData } = useUser()

  useEffect(() => {
    const validateEmail = async () => {
      console.log('Validate token: ' + token)
      try {
        const response = await ValidateUserUpdateEmail(token as string)
        const updatedEmail = await AsyncStorage.getItem('@updatedEmail')

        if (userData && updatedEmail) {
          setUserData({
            ...userData,
            data: {
              ...userData.data,
              email: updatedEmail,
            },
          })
        }

        await AsyncStorage.setItem('@token', token as string)
        ToastAndroid.show('Email atualizado com sucesso!', ToastAndroid.SHORT)

        console.log(response)
        router.navigate('/profile')
      } catch (responseError) {
        const error = getErrorMessage(responseError)
        ToastAndroid.show(error, ToastAndroid.SHORT)
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
