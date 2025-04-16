import { Input, Button } from '@/components/ui'
import { colors } from '@/styles/theme'
import { IconLock, IconMail } from '@tabler/icons-react-native'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { styles } from './styles'
import { Image } from 'react-native'

export function LoginScreen() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleRegister = async () => {
    try {
      const response = await fetch(
        'https://habitboost-api.onrender.com/user/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: senha,
          }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        console.log(data)
        Alert.alert('Registro bem-sucedido!', `Usuário: ${data.username}`)
      } else {
        Alert.alert('Erro no registro', data.message || 'Tente novamente')
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Erro', 'Algo deu errado ao se registrar.')
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
          <Input
            placeholder='Digite seu email'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          >
            <Input.Icon icon={IconMail} />
          </Input>
          <Input
            placeholder='Crie uma senha'
            value={senha}
            variant='password'
            onChangeText={setSenha}
          >
            <Input.Icon icon={IconLock} />
          </Input>
          <Link href='/' style={styles.forgotPassword}>
            Esqueci a senha
          </Link>
          <Button variant='secundary' onPress={handleRegister}>
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
