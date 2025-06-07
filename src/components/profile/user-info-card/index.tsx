import { Text, View, Animated, Easing } from 'react-native'
import { styles } from './styles'
import { useEffect, useState, useRef } from 'react'
import {
  getProfile,
  GetProfileResponse,
} from '@/services/http/user/get-profile'
import { getInitials } from '@/utils/get-initials'

type UserData = Pick<GetProfileResponse, 'data'>

export function UserInfoCard() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProfile()
      if (response) {
        setUserData(response)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <View style={styles.userInfoContainer}>
        <Animated.View
          style={[
            styles.userInfoAvatar,
            { backgroundColor: '#e0e0e0', opacity },
          ]}
        />
        <View style={styles.userInfoTextContainer}>
          <Animated.View
            style={{
              width: 100,
              height: 20,
              backgroundColor: '#e0e0e0',
              borderRadius: 4,
              marginBottom: 8,
              opacity,
            }}
          />
          <Animated.View
            style={{
              width: 180,
              height: 16,
              backgroundColor: '#e0e0e0',
              borderRadius: 4,
              opacity,
            }}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.userInfoContainer}>
      <View style={styles.userInfoAvatar}>
        <Text style={styles.userInfoAvatarText}>
          {getInitials(userData?.data.username!)}
        </Text>
      </View>
      <View style={styles.userInfoTextContainer}>
        <Text style={styles.userInfoUsernameText}>
          {userData?.data.username!}
        </Text>
        <Text style={styles.userInfoUserEmailText}>
          {userData?.data.email!}
        </Text>
      </View>
    </View>
  )
}
