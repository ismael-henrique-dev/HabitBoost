// components/IconPickerModal.tsx
import React from 'react'
import { Modal, View, Text, Pressable, ScrollView } from 'react-native'
import { styles } from './styles'
import { IconX } from '@tabler/icons-react-native'
import { tablerIcons } from '@/utils/icons-list'

type Props = {
  visible: boolean
  onClose: () => void
  onSelect: (iconName: string) => void
  selectedIcon: string | null
}

export function IconPickerModal({
  visible,
  onClose,
  onSelect,
  selectedIcon,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType='fade'>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Escolha um ícone</Text>
            <Pressable onPress={onClose}>
              <IconX size={20} color='black' />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.iconGrid}>
            {tablerIcons.map(({ name, component: Icon }) => (
              <Pressable
                key={name}
                style={[
                  styles.iconButton,
                  selectedIcon === name && styles.iconSelected,
                ]}
                onPress={() => onSelect(name)}
              >
                <Icon size={22} color='#000' />
              </Pressable>
            ))}
          </ScrollView>

          <Pressable style={styles.concludeButton} onPress={onClose}>
            <Text style={styles.concludeText}>Concluir</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
