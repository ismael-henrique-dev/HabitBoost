import { useState } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { Input, Button } from '@/components/ui'
import { colors } from '@/styles/theme'
import { IconMail } from '@tabler/icons-react-native'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  RegisterFormData,
  registerFormSchema,
} from '@/validators/auth/register'
import { register } from '@/services/http/auth/register'
import { getErrorMessage } from '@/utils/get-error-menssage'
import { ErrorMenssage } from '@/components/ui/error-menssage'
import { styles } from './style'

export function SendEmailScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSendEmail(data: RegisterFormData) {
    try {
      setIsLoading(true)
      await register(data)
      console.log(data)
    } catch (responseError) {
      const error = getErrorMessage(responseError)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView style={{ paddingVertical: 20 }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Criar conta</Text>
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
                Criar conta
              </Button.Title>
            </Button>
            <Button onPress={() => router.navigate('/login')}>
              <Button.Title>Entrar</Button.Title>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
