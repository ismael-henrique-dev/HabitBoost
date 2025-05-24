import { Text, View } from 'react-native'
import { styles } from './styles'
import { RankingUser } from '@/services/http/ranking/get-ranking-data'
import { getInitials } from '@/utils/get-initials'

export type PodiumProps = {
  data: {
    first: RankingUser | undefined
    second: RankingUser | undefined
    third: RankingUser | undefined
  }
}

export function Podium({ data }: PodiumProps) {
  return (
    <View style={styles.podiumContainer}>
      {/* Terceiro lugar */}
      <View style={[styles.podiumItem, { height: '95%' }]}>
        <View style={styles.circle}>
          <Text style={styles.initials}>{getInitials(data.third?.username!)}</Text>
        </View>
        <Text style={styles.name}>{data.third?.username}</Text>
        <View style={styles.goalsInfo}>
          <Text style={styles.metas}>{data.third?.weektotal} metas</Text>
        </View>
        <View style={[styles.bar, { height: '100%' }]}>
          <Text style={styles.position}>3</Text>
        </View>
      </View>

      {/* Primeiro lugar */}
      <View style={[styles.podiumItem, { height: '105%' }]}>
        <View style={styles.circle}>
            <Text style={styles.initials}>{getInitials(data.first?.username!)}</Text>
        </View>
        <Text style={styles.name}>{data.first?.username}</Text>
        <View style={styles.goalsInfo}>
          <Text style={styles.metas}>{data.first?.weektotal} metas</Text>
        </View>
        <View style={[styles.bar, { height: '100%' }]}>
          <Text style={styles.position}>1</Text>
        </View>
      </View>

      <View style={[styles.podiumItem, { height: '100%' }]}>
        <View style={styles.circle}>
          <Text style={styles.initials}>{getInitials(data.second?.username!)}</Text>
        </View>
        <Text style={styles.name}>{data.second?.username}</Text>
        <View style={styles.goalsInfo}>
          <Text style={styles.metas}>{data.second?.weektotal} metas</Text>
        </View>
        <View style={[styles.bar, { height: '100%' }]}>
          <Text style={styles.position}>2</Text>
        </View>
      </View>
    </View>
  )
}
