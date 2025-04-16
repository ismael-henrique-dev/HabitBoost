import React, { useState } from 'react'
import { View, Text, Alert, Image } from 'react-native'
import { Input, Button } from '@/components/ui'
import { colors } from '@/styles/theme'
import { IconLock, IconMail, IconUser } from '@tabler/icons-react-native'
import { router } from 'expo-router'
import { styles } from './styles'

export function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [username, setUsername] = useState('')

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
            username: username,
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
        <Text style={styles.title}>Criar conta</Text>
        <View style={styles.formContainer}>
          <Input
            placeholder='Digite seu nome'
            value={username}
            onChangeText={setUsername}
          >
            <Input.Icon icon={IconUser} />
          </Input>
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
          <Button variant='secundary' onPress={handleRegister}>
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
  )
}
