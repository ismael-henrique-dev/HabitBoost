import { Text, View } from 'react-native'
import { styles } from './styles'

export function Podium() {
  return (
    <View style={styles.podiumContainer}>
      {/* Terceiro lugar */}
      <View style={[styles.podiumItem, { height: '95%' }]}>
        <View style={styles.circle}>
          <Text style={styles.initials}>PH</Text>
        </View>
        <Text style={styles.name}>Pedro Henrik</Text>
        <View style={styles.goalsInfo}>
          <Text style={styles.metas}>12 metas</Text>
        </View>
        <View style={[styles.bar, { height: '100%' }]}>
          <Text style={styles.position}>3</Text>
        </View>
      </View>

      {/* Primeiro lugar */}
      <View style={[styles.podiumItem, { height: '105%' }]}>
        <View style={styles.circle}>
          <Text style={styles.initials}>PH</Text>
        </View>
        <Text style={styles.name}>Pedro Henrik</Text>
        <View style={styles.goalsInfo}>
          <Text style={styles.metas}>12 metas</Text>
        </View>
        <View style={[styles.bar, { height: '100%' }]}>
          <Text style={styles.position}>1</Text>
        </View>
      </View>

      <View style={[styles.podiumItem, { height: '100%' }]}>
        <View style={styles.circle}>
          <Text style={styles.initials}>PH</Text>
        </View>
        <Text style={styles.name}>Pedro Henrik</Text>
        <View style={styles.goalsInfo}>
          <Text style={styles.metas}>12 metas</Text>
        </View>
        <View style={[styles.bar, { height: '100%' }]}>
          <Text style={styles.position}>2</Text>
        </View>
      </View>
    </View>
  )
}
