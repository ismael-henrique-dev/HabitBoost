// components/IconPickerModal.tsx
import React from 'react'
import { Modal, View, Text, Pressable, ScrollView } from 'react-native'
import { styles } from './styles'
import { IconX } from '@tabler/icons-react-native'
import { categoriesIcons } from '@/utils/icons-list'


type Props = {
  visible: boolean
  onClose: () => void
  onSelect: (iconId: string) => void
  selectedIconId: string | null
}

export function IconPickerModal({
  visible,
  onClose,
  onSelect,
  selectedIconId,
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
            {Object.entries(categoriesIcons).map(([iconId, Icon]) => (
              <Pressable
                key={iconId}
                style={[
                  styles.iconButton,
                  selectedIconId === iconId && styles.iconSelected,
                ]}
                onPress={() => onSelect(iconId)}
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
