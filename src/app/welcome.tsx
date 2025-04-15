import { useLocalSearchParams } from 'expo-router'
import { Button } from 'react-native'
import { Text, View } from 'react-native'

export  default function Welcome() {

  return (
    <View>
      <Text>Bem-vindo ao HabitBoost!</Text>
      <Text>Sua jornada para hábitos mais saudáveis começa aqui.</Text>
      <Button
        title='Começar'
        onPress={() => {
          // Navegar para a tela de registro ou login
        }}
      />
    </View>
  )
}
