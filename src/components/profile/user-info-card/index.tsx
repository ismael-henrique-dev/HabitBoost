import { Text, View } from 'react-native'
import { styles } from './styles'
import { useEffect, useState } from 'react'
import { getProfile, GetProfileResponse } from '@/services/http/user/get-profile'
import { getInitials } from '@/utils/get-initials'

type UserData = Pick<GetProfileResponse, 'data'>

export function UserInfoCard() {
  const [userData, setUserData] = useState<UserData | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      const response = await getProfile()
      console.log('Ranking data', response)

      if (response) {
        setUserData(response)
      }
    }

    fetchData()
  }, [])

  return (
    <View style={styles.userInfoContainer}>
      <View style={styles.userInfoAvatar}>
        <Text style={styles.userInfoAvatarText}>{getInitials(userData?.data.username!)}</Text>
      </View>
      <View style={styles.userInfoTextContainer}>
        <Text style={styles.userInfoUsernameText}>{userData?.data.username!}</Text>
        <Text style={styles.userInfoUserEmailText}>
          {userData?.data.email!}
        </Text>
      </View>
    </View>
  )
}
