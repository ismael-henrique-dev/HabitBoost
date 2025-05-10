import { useRef, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import {
  IconDotsVertical,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react-native'
import { colors } from '@/styles/theme'

import { useHabit } from '@/contexts/habit-context'
import { router } from 'expo-router'
import { styles } from './styles'

type CategorySelectBottomSheetProps = {
  habitId: string
  goalId: string
}

export function GoalOptionsBottomSheet({
  habitId,
  goalId
}: CategorySelectBottomSheetProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const { deleteGoalFromHabit } = useHabit()

  const handleOpen = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  function handleDeleteGoal(habitId: string, goalId: string) {
    if (habitId && goalId) {
      deleteGoalFromHabit(habitId, goalId)
      // colocar toast aqui
    }
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
                  pathname: '/update-goal',
                  params: { habitId: habitId, goalId: goalId },
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
                handleDeleteGoal(habitId, goalId)
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
