import { Modal, Text, View } from 'react-native'
import {
  IconLogout,
  IconTrash,
  IconUserEdit,
  IconX,
} from '@tabler/icons-react-native'
import { ActionItem } from './action-item'
import { styles } from './styles'
import { useState } from 'react'
import { colors } from '@/styles/theme'
import { Button } from '@/components/ui'
import { deleteUserOnServer } from '@/services/http/user/delete-user'
import { useAuth } from '@/contexts/auth-context'

export function AccountActions() {
  const [modalVisible, setModalVisible] = useState(false)
  const { setIsLogged, logout } = useAuth()

  async function hableLogout() {
    await logout()
    setIsLogged(false)
  }

  async function handleDeleteUserAccount() {
    try {
      await deleteUserOnServer()
      await logout()
      setIsLogged(false)
    } catch {
      console.log('erro')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conta</Text>;
      <Modal
        animationType='fade'
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <ModalContent
            setModalVisible={() => setModalVisible(false)}
            anyFunction={handleDeleteUserAccount}
          />
        </View>
      </Modal>
      <ActionItem icon={IconUserEdit} label='Alterar dados cadastrais' />
      <ActionItem
        icon={IconTrash}
        label='Deletar conta'
        onPress={() => setModalVisible(true)}
      />
      <ActionItem icon={IconLogout} label='Logout' onPress={hableLogout} />
    </View>
  )
}

type ModalContentProps = {
  setModalVisible: (value: React.SetStateAction<boolean>) => void
  anyFunction: () => void
}

function ModalContent({ setModalVisible, anyFunction }: ModalContentProps) {
  async function handleFunction() {
    anyFunction()
    setModalVisible(false)
  }

  return (
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Deletar conta</Text>
        <IconX
          color={colors.zinc[900]}
          size={24}
          onPress={() => setModalVisible(false)}
        />
      </View>
      <Text style={styles.modalText}>
        Deseja de fato deletar sua conta? Todos os seus dados serão excluidos
        permenantemente.
      </Text>
      <View style={styles.modalActions}>
        <Button variant='alert' onPress={handleFunction}>
          <Button.Title style={{ color: colors.zinc[50] }}>
            Deletar conta
          </Button.Title>
        </Button>
        <Button onPress={() => setModalVisible(false)}>
          <Button.Title>Cancelar</Button.Title>
        </Button>
      </View>
    </View>
  )
}
