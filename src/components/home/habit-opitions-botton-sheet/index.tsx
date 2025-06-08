import { useRef, useCallback } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import {
  IconDotsVertical,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react-native'
import { colors } from '@/styles/theme'
import { styles } from './styles'
import { useHabit } from '@/contexts/habit-context'
import { router } from 'expo-router'
import { deleteHabitOnServer } from '@/services/http/habits/delete-habit'
import { useAuth } from '@/hooks/use-auth'

type CategorySelectBottomSheetProps = {
  habitId: string
}

export function HabitOptionsBottomSheet({
  habitId,
}: CategorySelectBottomSheetProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { isLogged } = useAuth()

  const { deleteHabit } = useHabit()

  const handleOpen = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  async function handleDeleteHabit(id: string) {
    if (isLogged) {
      await deleteHabitOnServer(id)
      deleteHabit(id)
    } else {
      deleteHabit(id)
    }
    // colocar toast aqui
  }

  return (
    <View>
      {/* Trigger */}
      <TouchableOpacity onPress={handleOpen}>
        <IconDotsVertical color={colors.zinc[900]} />
      </TouchableOpacity>

      {/* BottomSheetModal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={[240]}
        backgroundStyle={styles.bottomSheetBackgroundStyle}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        style={styles.bottomSheetStyle}
        enableOverDrag={true}
        enablePanDownToClose={true}
      >
        <View style={styles.sheetContent}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Opções</Text>
          </View>
          <BottomSheetView style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                router.navigate({
                  pathname: '/update-habit',
                  params: { habitId: habitId },
                })

                handleClose()
              }}
            >
              <IconPencil
                size={24}
                color={colors.zinc[900]}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                handleDeleteHabit(habitId)
                handleClose()
              }}
            >
              <IconTrash
                size={24}
                color={colors.zinc[900]}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Excluir</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </View>
      </BottomSheetModal>
    </View>
  )
}
