import { Input, Button } from '@/components/ui'
import { colors } from '@/styles/theme'
import { IconLock, IconMail } from '@tabler/icons-react-native'
import { Link, router } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'
import { Image } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { LoginFormData, loginFormSchema } from '@/validators/auth/login'
import { login } from '@/services/http/auth/login'
import { ErrorMenssage } from '@/components/ui/error-menssage'
import { getErrorMessage } from '@/utils/get-error-menssage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '@/contexts/auth-context'
import { notify } from 'react-native-notificated'
import { useSettings } from '@/hooks/use-settings'

export function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const { isLogged, setIsLogged } = useAuth()
  // const { updateSetting } = useSettings()

  useEffect(() => {
    if (isLogged) {
      router.navigate('/profile')
    }
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleLogin(data: LoginFormData) {
    try {
      setIsLoading(true)
      const response = await login(data)

      notify('custom' as any, {
        params: {
          customTitle: 'Login realizado com sucesso!',
          type: 'success',
        },
        config: {
          duration: 2000,
        },
      })

      console.log(data)

      // await AsyncStorage.clear()

      // updateSetting('firstTimeUser', false)
      await AsyncStorage.setItem('@token', response.token)
      setIsLogged(true)
      router.navigate('/profile')
    } catch (responseError) {
      const error = getErrorMessage(responseError)
      console.log(error)

      notify('custom' as any, {
        params: {
          customTitle: error,
          type: 'error',
        },
        config: {
          duration: 2000,
        },
      })
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
        <Text style={styles.title}>Entrar</Text>
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
          <Link href='/send-email' style={styles.forgotPassword}>
            Esqueci a senha
          </Link>
          <Button
            variant='secundary'
            onPress={handleSubmit(handleLogin)}
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
