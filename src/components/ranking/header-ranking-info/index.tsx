import { colors } from '@/styles/theme'
import { IconInfoCircle, IconX } from '@tabler/icons-react-native'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useState } from 'react'

export function HeaderRankingInfo() {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <View style={styles.container}>
      <Modal
        animationType='fade'
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <ModalContent setModalVisible={() => setModalVisible(false)} />
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        <IconInfoCircle size={24} color={colors.zinc[900]} />
      </TouchableOpacity>
    </View>
  )
}

type ModalContentProps = {
  setModalVisible: (value: React.SetStateAction<boolean>) => void
}

function ModalContent({ setModalVisible }: ModalContentProps) {
  return (
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Como o ranking funciona?</Text>
        <IconX
          color={colors.zinc[900]}
          size={24}
          onPress={() => setModalVisible(false)}
        />
      </View>
      <Text style={styles.modalText}>
        O ranking exibe os três usuários com o maior número de metas concluídas
        ao longo da semana. Ele contabiliza as metas finalizadas de segunda a
        sábado e apresenta os resultados no domingo.
      </Text>
      <Text style={styles.modalText}>
        E se der empate? O usuário que alcançou a marca primeiro será
        priorizado.
      </Text>
    </View>
  )
}
