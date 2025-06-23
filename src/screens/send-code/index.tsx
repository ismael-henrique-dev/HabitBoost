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
import { sendCode } from '@/services/http/auth/send-code'
import {
  SendCodeFormData,
  sendCodeFormSchema,
} from '@/validators/auth/send-code'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function SendCodeScreen() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SendCodeFormData>({
    resolver: zodResolver(sendCodeFormSchema),
    defaultValues: {
      code: '',
    },
  })

  async function handleSendCode(data: SendCodeFormData) {
    try {
      setIsLoading(true)

      console.log(data)
      const response = await sendCode(data.code)
      await AsyncStorage.setItem('token', response.token)

      console.log(response)
      router.navigate('/new-password')
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
          <Text style={styles.title}>Recuperação de senha</Text>
          <Text style={styles.subTitle}>
            Digite o código que foi enviado no seu email.
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Código de verificação'
                keyboardType='email-address'
                value={value}
                onChangeText={onChange}
              >
                <Input.Icon icon={IconKey} />
              </Input>
            )}
            name='code'
          />
          {errors.code && <ErrorMenssage>{errors.code.message}</ErrorMenssage>}
          <Button
            variant='secundary'
            onPress={handleSubmit(handleSendCode)}
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
