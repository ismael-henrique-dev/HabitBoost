import { View, Text } from 'react-native'
import { styles } from './styles'

export function OverviewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overview</Text>
      <View style={styles.separator} />
    </View>
  )
}
