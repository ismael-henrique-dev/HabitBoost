import { Button } from 'react-native'
import { Text, View } from 'react-native'
import { router } from 'expo-router'

export default function Welcome() {
  return (
    <View>
      <Text>Bem-vindo ao HabitBoost!</Text>
      <Text>Sua jornada para hábitos mais saudáveis começa aqui.</Text>
      <Button title='Começar' onPress={() => router.navigate('/')} />
    </View>
  )
}
