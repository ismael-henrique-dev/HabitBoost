import { Text, View } from 'react-native'

import { router } from 'expo-router'
import { styles } from './styles'

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        onPress={() => router.navigate('/(auth)/register')}
      >
        Profile
      </Text>
      <View style={styles.separator} />
    </View>
  )
}


