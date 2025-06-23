import { Input, Button } from '@/components/ui'
import { colors } from '@/styles/theme'
import { IconKey } from '@tabler/icons-react-native'
import { router } from 'expo-router'
import { useState } from 'react'
import { View, Text } from 'react-native'
import { Image } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMenssage } from '@/components/ui/error-menssage'
import { getErrorMessage } from '@/utils/get-error-menssage'
import { styles } from './styles'
import { newPassword } from '@/services/http/auth/new-password'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  NewPasswordFormData,
  newPasswordFormSchema,
} from '@/validators/auth/new-password'

export function NewPasswordScreen() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordFormSchema),
    defaultValues: {},
  })

  async function handleNewPassword(data: NewPasswordFormData) {
    try {
      setIsLoading(true)

      console.log(data)
      const email = await AsyncStorage.getItem('email')
      const token = await AsyncStorage.getItem('token')
      const response = await newPassword({
        email: email as string,
        newPassword: data.password,
        token: token as string,
      })

      console.log(response)
      router.navigate('/login')
    } catch (responseError) {
      const error = getErrorMessage(responseError)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
        <View>
          <Text style={styles.title}>Nova senha</Text>
          <Text style={styles.subTitle}>Crie uma nova senha.</Text>
        </View>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Digite uma nova senha'
                keyboardType='email-address'
                value={value}
                onChangeText={onChange}
              >
                <Input.Icon icon={IconKey} />
              </Input>
            )}
            name='password'
          />
          {errors.password && (
            <ErrorMenssage>{errors.password.message}</ErrorMenssage>
          )}{' '}
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Confirmar nova senha'
                keyboardType='email-address'
                value={value}
                onChangeText={onChange}
              >
                <Input.Icon icon={IconKey} />
              </Input>
            )}
            name='confirmPassword'
          />
          {errors.confirmPassword && (
            <ErrorMenssage>{errors.confirmPassword.message}</ErrorMenssage>
          )}
          <Button
            variant='secundary'
            onPress={handleSubmit(handleNewPassword)}
            disabled={isLoading && isValid}
            isLoading={isLoading}
          >
            <Button.Title style={{ color: colors.zinc[50] }}>
              Entrar
            </Button.Title>
          </Button>
          <Button onPress={() => router.navigate('/register')}>
            <Button.Title>Criar conta</Button.Title>
          </Button>
        </View>
      </View>
    </View>
  )
}
