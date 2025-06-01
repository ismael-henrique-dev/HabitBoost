import { Input, Button } from '@/components/ui'
import { colors } from '@/styles/theme'
import { IconLock, IconMail } from '@tabler/icons-react-native'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { View, Text } from 'react-native'
import { Image } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { LoginFormData, loginFormSchema } from '@/validators/auth/login'
import { login } from '@/services/http/auth/login'
import { ErrorMenssage } from '@/components/ui/error-menssage'
import { getErrorMessage } from '@/utils/get-error-menssage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from './styles'
import {
  SendEmailFormData,
  sendEmailFormSchema,
} from '@/validators/auth/send-code'
import { sendEmail } from '@/services/http/auth/send-email'

export function SendEmailScreen() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SendEmailFormData>({
    resolver: zodResolver(sendEmailFormSchema),
    defaultValues: {
      email: '',
    },
  })

  async function handleSendEmail(data: SendEmailFormData) {
    try {
      setIsLoading(true)

      console.log(data)
      const response = await sendEmail(data)

      console.log(response)

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
        <Text style={styles.title}>Recuperação de senha</Text>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Digite seu email'
                keyboardType='email-address'
                value={value}
                onChangeText={onChange}
              >
                <Input.Icon icon={IconMail} />
              </Input>
            )}
            name='email'
          />
          {errors.email && (
            <ErrorMenssage>{errors.email.message}</ErrorMenssage>
          )}
          <Button
            variant='secundary'
            onPress={handleSubmit(handleSendEmail)}
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
