import { Text, View } from 'react-native'
import { styles } from './styles'

export function RankingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking</Text>
      <View style={styles.separator} />
    </View>
  )
}

