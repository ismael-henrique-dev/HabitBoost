import { Text, View } from 'react-native'
import { styles } from './styles'

export function UserInfoCard() {
  return (
    <View style={styles.userInfoContainer}>
      <View style={styles.userInfoAvatar}>
        <Text style={styles.userInfoAvatarText}>IH</Text>
      </View>
      <View style={styles.userInfoTextContainer}>
        <Text style={styles.userInfoUsernameText}>Ismael Henrique</Text>
        <Text style={styles.userInfoUserEmailText}>
          ismaelhenrique@gmail.com
        </Text>
      </View>
    </View>
  )
}
