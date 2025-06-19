import { Image, Text, View } from 'react-native'
import { styles } from './styles'
import { UpdateUserInfo } from '@/components/update-user-data'
import { getInitials } from '@/utils/get-initials'
import { UserData } from '@/components/profile/user-info-card'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UpdateUsernameModal } from '../../modals/update-username-modal'
import { UpdateUserEmailModal } from '../../modals/update-user-email-modal'
import { UpdateUserPasswordModal } from '../../modals/update-user-password-modal'

export function UpdateUserDataForm() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [showUserUpdateDataModal, setShowUserUpdateDataModal] = useState(false)
  const [showUserUpdateEmailModal, setShowUserUpdateEmailModal] =
    useState(false)
  const [showUserUpdatePassword, setShowUserUpdatePassword] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AsyncStorage.getItem('@userData')
        if (response) {
          const parsed = JSON.parse(response)
          setUserData(parsed)
        }
      } catch (error) {
        console.error('Erro ao recuperar dados do usuário:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <View style={styles.formContainer}>
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

      {/* Email */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email:</Text>
        <UpdateUserInfo
          placeholder='Opcional'
          defaultValue={userData?.data.email}
          onOpenModal={setShowUserUpdateEmailModal}
        />
      </View>
      <UpdateUserEmailModal
        visible={showUserUpdateEmailModal}
        onClose={() => setShowUserUpdateEmailModal(false)}
      />

      {/* Username */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome de usuário:</Text>
        <UpdateUserInfo
          placeholder='Opcional'
          defaultValue={userData?.data.username}
          onOpenModal={setShowUserUpdateDataModal}
        />
      </View>
      <UpdateUsernameModal
        visible={showUserUpdateDataModal}
        onClose={() => setShowUserUpdateDataModal(false)}
      />

      {/* Password */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Senha:</Text>
        <UpdateUserInfo
          placeholder='Opcional'
          variant='password'
          defaultValue='*******'
          onOpenModal={setShowUserUpdatePassword}
        />
      </View>
      <UpdateUserPasswordModal
        visible={showUserUpdatePassword}
        onClose={() => setShowUserUpdatePassword(false)}
      />
    </View>
  )
}
