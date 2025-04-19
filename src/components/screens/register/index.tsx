import { useState } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { Input, Button } from '@/components/ui'
import { colors } from '@/styles/theme'
import { IconLock, IconMail, IconUser } from '@tabler/icons-react-native'
import { router } from 'expo-router'
import { styles } from './styles'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  RegisterFormData,
  registerFormSchema,
} from '@/validators/auth/register'
import { register } from '@/services/http/auth/register'
import { getErrorMessage } from '@/utils/get-error-menssage'
import { ErrorMenssage } from '@/components/ui/error-menssage'

export function RegisterScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      confirmPassword: '',
      email: '',
      password: '',
    },
  })

  async function handleRegister(data: RegisterFormData) {
    const registerData = {
      username: data.username,
      email: data.email,
      password: data.password,
    }
    try {
      setIsLoading(true)
      await register(registerData)
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
                  placeholder='Digite seu nome'
                  value={value}
                  onChangeText={onChange}
                >
                  <Input.Icon icon={IconUser} />
                </Input>
              )}
              name='username'
            />
            {errors.username && (
              <ErrorMenssage>{errors.username.message}</ErrorMenssage>
            )}
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
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Crie uma senha'
                  value={value}
                  variant='password'
                  onChangeText={onChange}
                >
                  <Input.Icon icon={IconLock} />
                </Input>
              )}
              name='password'
            />
            {errors.password && (
              <ErrorMenssage>{errors.password.message}</ErrorMenssage>
            )}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Crie uma senha'
                  value={value}
                  variant='password'
                  onChangeText={onChange}
                >
                  <Input.Icon icon={IconLock} />
                </Input>
              )}
              name='confirmPassword'
            />
            {errors.confirmPassword && (
              <ErrorMenssage>{errors.confirmPassword.message}</ErrorMenssage>
            )}
            <Button
              variant='secundary'
              onPress={handleSubmit(handleRegister)}
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
