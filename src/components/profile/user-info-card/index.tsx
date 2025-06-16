import { Text, View, Animated, Easing, Image } from 'react-native'
import { styles } from './styles'
import { useEffect, useState, useRef } from 'react'
import {
  getProfile,
  GetProfileResponse,
} from '@/services/http/user/get-profile'
import { getInitials } from '@/utils/get-initials'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type UserData = Pick<GetProfileResponse, 'data'>

type UserInfoCardProps = {
  isLogged: boolean
}

export function UserInfoCard({ isLogged: userIsLogged }: UserInfoCardProps) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const opacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    let animation: Animated.CompositeAnimation

    if (loading) {
      animation = Animated.loop(
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
      )
      animation.start()
    }

    return () => {
      animation?.stop()
    }
  }, [loading])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProfile()
      if (response) {
        setUserData(response)
        await AsyncStorage.setItem('@userData', JSON.stringify(response))
      }
      setLoading(false)
    }

    if (userIsLogged) {
      fetchData()
    }

    if (!userIsLogged) {
      setUserData(null)
      setLoading(false)
    }
  }, [userIsLogged])

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
        {userData?.data.imageUrl ? (
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/a/ACg8ocLeR6AGRjYVsdLpX4wYC9brG_z2EdZ2hHlh-MyJPGpQeuD1kFA=s96-c',
            }}
            style={styles.userAvatarImage}
          />
        ) : (
          <Text style={styles.userInfoAvatarText}>
            {userData ? getInitials(userData.data.username) : '...'}
          </Text>
        )}
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
