import { Text, View } from 'react-native'
import { router } from 'expo-router'
import { styles } from './styles'

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        onPress={() => router.navigate('/register')}
      >
        Home
      </Text>
      <View style={styles.separator} />
    </View>
  )
}


