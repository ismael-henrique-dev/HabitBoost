import { Image, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { UpdateUserInfo } from '@/components/update-user-data'
import { getInitials } from '@/utils/get-initials'
import { UserData } from '@/components/profile/user-info-card'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UpdateUsernameModal } from '../../modals/update-username-modal'
import { UpdateUserEmailModal } from '../../modals/update-user-email-modal'
import { UpdateUserPasswordModal } from '../../modals/update-user-password-modal'
import { IconPencil } from '@tabler/icons-react-native'
import { colors } from '@/styles/theme'
import { UpdateUserProfileImageModal } from '../../modals/update-user-profile-image'

export function UpdateUserDataForm() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [showUserUpdateDataModal, setShowUserUpdateDataModal] = useState(false)
  const [showUserUpdateEmailModal, setShowUserUpdateEmailModal] =
    useState(false)
  const [showUserUpdatePassword, setShowUserUpdatePassword] = useState(false)
  const [showUserProfileModalUpdateImage, setShowUserProfileModalUpdateImage] =
    useState(false)

  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AsyncStorage.getItem('@userData')
        if (response) {
          const parsed: UserData = JSON.parse(response)
          setUserData(parsed)
          setImageUrl(parsed.data.imageUrl)
        }
      } catch (error) {
        console.error('Erro ao recuperar dados do usuário:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <View style={styles.formContainer}>
      <View style={styles.userInfoAvatarContainer}>
        <View style={styles.userInfoAvatar}>
          {userData?.data.imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.userAvatarImage} />
          ) : (
            <Text style={styles.userInfoAvatarText}>
              {userData ? getInitials(userData.data.username) : '...'}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.editAvatarButton}
          onPress={() => {
            console.log('Editar imagem de perfil')
            setShowUserProfileModalUpdateImage(true)
          }}
        >
          <IconPencil size={16} color={colors.zinc[600]} />
        </TouchableOpacity>

        <UpdateUserProfileImageModal
          visible={showUserProfileModalUpdateImage}
          onClose={() => setShowUserProfileModalUpdateImage(false)}
          setImageUrl={setImageUrl}
        />
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
