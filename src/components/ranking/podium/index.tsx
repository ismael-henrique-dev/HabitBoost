import { Text, View, Animated, Easing } from 'react-native'
import { styles } from './styles'
import { RankingUser } from '@/services/http/ranking/get-ranking-data'
import { getInitials } from '@/utils/get-initials'
import { useEffect, useRef } from 'react'

export type PodiumProps = {
  data: {
    first: RankingUser | undefined
    second: RankingUser | undefined
    third: RankingUser | undefined
  }
  loading?: boolean
}

export function Podium({ data, loading }: PodiumProps) {
  const opacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.4,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start()
    }
  }, [loading, opacity])

  if (loading) {
    return (
      <View style={styles.podiumContainer}>
        <Animated.View style={[styles.podiumItem, { height: '95%', opacity }]}>
          <View style={[styles.circle, { backgroundColor: '#e0e0e0' }]} />
          <View style={{ width: 60, height: 16, backgroundColor: '#e0e0e0', borderRadius: 4, marginTop: 8, marginBottom: 4, alignSelf: 'center' }} />
          <View style={{ width: 40, height: 14, backgroundColor: '#e0e0e0', borderRadius: 4, alignSelf: 'center' }} />
          <View style={[styles.bar, { height: '100%', backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }]}>
            <View style={{ width: 16, height: 16, backgroundColor: '#d0d0d0', borderRadius: 8 }} />
          </View>
        </Animated.View>
        <Animated.View style={[styles.podiumItem, { height: '105%', opacity }]}>
          <View style={[styles.circle, { backgroundColor: '#e0e0e0' }]} />
          <View style={{ width: 60, height: 16, backgroundColor: '#e0e0e0', borderRadius: 4, marginTop: 8, marginBottom: 4, alignSelf: 'center' }} />
          <View style={{ width: 40, height: 14, backgroundColor: '#e0e0e0', borderRadius: 4, alignSelf: 'center' }} />
          <View style={[styles.bar, { height: '100%', backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }]}>
            <View style={{ width: 16, height: 16, backgroundColor: '#d0d0d0', borderRadius: 8 }} />
          </View>
        </Animated.View>
        <Animated.View style={[styles.podiumItem, { height: '100%', opacity }]}>
          <View style={[styles.circle, { backgroundColor: '#e0e0e0' }]} />
          <View style={{ width: 60, height: 16, backgroundColor: '#e0e0e0', borderRadius: 4, marginTop: 8, marginBottom: 4, alignSelf: 'center' }} />
          <View style={{ width: 40, height: 14, backgroundColor: '#e0e0e0', borderRadius: 4, alignSelf: 'center' }} />
          <View style={[styles.bar, { height: '100%', backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }]}>
            <View style={{ width: 16, height: 16, backgroundColor: '#d0d0d0', borderRadius: 8 }} />
          </View>
        </Animated.View>
      </View>
    )
  }

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

      {/* Segundo lugar */}
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
