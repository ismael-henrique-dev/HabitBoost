import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ModalProps,
  StyleSheet,
} from 'react-native'
import { IconX } from '@tabler/icons-react-native'
import { styles } from './styles'
import { colors } from '@/styles/theme'

/* ===============================
 * Base types
 * =============================== */
type ModalHeaderProps = {
  children?: React.ReactNode
  onClose?: () => void
}

type ModalTitleProps = {
  children: React.ReactNode
}

type ModalSubtitleProps = {
  children: React.ReactNode
}

type ModalContentProps = {
  children: React.ReactNode
}

type ModalActionsProps = {
  children: React.ReactNode
}

type ModalRootProps = {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
} & Partial<ModalProps>

/* ===============================
 * Root Modal Wrapper
 * =============================== */
function ModalRoot({ visible, onClose, children, ...rest }: ModalRootProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      {...rest}
    >
      <View style={internal.overlay}>
        <View style={internal.container}>{children}</View>
      </View>
    </Modal>
  )
}

/* ===============================
 * Subcomponents
 * =============================== */

function ModalHeader({ children, onClose }: ModalHeaderProps) {
  return (
    <View style={styles.modalHeader}>
      {children}
      {onClose && (
        <TouchableOpacity onPress={onClose}>
          <IconX size={24} color={colors.zinc[900]} />
        </TouchableOpacity>
      )}
    </View>
  )
}

function ModalHeaderTitle({ children }: ModalTitleProps) {
  return <Text style={styles.modalTitle}>{children}</Text>
}

function ModalHeaderSubtitle({ children }: ModalSubtitleProps) {
  return <Text style={styles.modalSubtitle}>{children}</Text>
}

function ModalContent({ children }: ModalContentProps) {
  return <View style={styles.modalContent}>{children}</View>
}

function ModalActions({ children }: ModalActionsProps) {
  return <View style={styles.modalActions}>{children}</View>
}

/* ===============================
 * ModalBase namespace export
 * =============================== */
export const ModalBase = Object.assign(ModalRoot, {
  Header: ModalHeader,
  HeaderTitle: ModalHeaderTitle,
  HeaderSubtitle: ModalHeaderSubtitle,
  Content: ModalContent,
  Actions: ModalActions,
})

/* ===============================
 * Internal styles
 * =============================== */
const internal = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.zinc[50],
    borderRadius: 12,
    width: '90%',
  },
})
