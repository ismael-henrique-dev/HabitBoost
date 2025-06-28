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
import { router } from 'expo-router'
import { notify } from 'react-native-notificated'
import { getErrorMessage } from '@/utils/get-error-menssage'

export function AccountActions() {
  const [modalVisible, setModalVisible] = useState(false)
  const { setIsLogged, logout } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  async function hableLogout() {
    await logout()
    setIsLogged(false)
  }

  async function handleDeleteUserAccount() {
    try {
      setIsLoading(true)
      await deleteUserOnServer()
      await logout()
      setIsLogged(false)
      notify('custom' as any, {
        params: {
          customTitle: 'Conta deletada com sucesso!',
          type: 'success',
        },
        config: {
          duration: 2000,
        },
      })
      setModalVisible(false)
    } catch (responseError) {
      const error = getErrorMessage(responseError)
      console.log(error)

      notify('custom' as any, {
        params: {
          customTitle: error,
          type: 'error',
        },
        config: {
          duration: 2000,
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conta</Text>
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
            isLoading={isLoading}
          />
        </View>
      </Modal>
      <ActionItem
        icon={IconUserEdit}
        label='Alterar dados cadastrais'
        onPress={() => router.navigate('/update-user-data')}
      />
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
  isLoading: boolean
}

function ModalContent({
  setModalVisible,
  anyFunction,
  isLoading,
}: ModalContentProps) {
  async function handleFunction() {
    anyFunction()
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
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          variant='alert'
          onPress={handleFunction}
        >
          <Button.Title style={{ color: colors.zinc[50] }}>
            Deletar conta
          </Button.Title>
        </Button>
        <Button disabled={isLoading} onPress={() => setModalVisible(false)}>
          <Button.Title>Cancelar</Button.Title>
        </Button>
      </View>
    </View>
  )
}
