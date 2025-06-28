import { useRef, useCallback, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useCategory } from '@/contexts/category-context'
import {
  IconCheck,
  IconCircleX,
  IconHourglass,
  IconCircleOff,
  IconFilter,
} from '@tabler/icons-react-native'
import { colors } from '@/styles/theme'
import { styles } from './styles'
import { HabitStatus } from '@/types/habit'
import { categoriesIcons } from '@/utils/icons-list'
import { router } from 'expo-router'

export function FiltersBottomSheet() {
  const { categories } = useCategory()

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<HabitStatus | null>(null)

  const handleOpen = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  const statusData = [
    {
      id: 'concluded',
      label: 'Concluídos',
      icon: <IconCheck size={18} color={colors.zinc[600]} />,
    },
    {
      id: 'unstarted',
      label: 'A fazer',
      icon: <IconHourglass size={18} color={colors.zinc[600]} />,
    },
    {
      id: 'missed',
      label: 'Não concluído',
      icon: <IconCircleOff size={18} color={colors.zinc[600]} />,
    },
  ] as { id: HabitStatus; label: string; icon: React.ReactNode }[]

  const handleClearFilters = () => {
    setSelectedCategory(null)
    setSelectedStatus(null)
    router.setParams({
      categoryId: null,
      status: null,
    })
  }

  return (
    <View>
      <TouchableOpacity onPress={handleOpen} style={styles.trigger}>
        <IconFilter size={24} color={colors.zinc[900]} />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={['50%', '50%']}
        index={1}
        backgroundStyle={styles.bottomSheetBackgroundStyle}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        style={styles.bottomSheetStyle}
      >
        <View style={styles.sheetContent}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Filtros</Text>
            <TouchableOpacity
              onPress={handleClearFilters}
              style={styles.newButton}
            >
              <Text style={styles.newButtonText}>Limpar filtros</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSheetContainer}>
            {/* Categoria */}
            <Text style={styles.filterItemLabel}>Categoria:</Text>

            <BottomSheetScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 16,
                paddingHorizontal: 4,
              }}
              style={{ marginBottom: 8 }}
            >
              {categories.map((item) => {
                const IconComponent = categoriesIcons[item.iconId]
                const isSelected = selectedCategory === item.id

                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      const newCategoryId = isSelected ? null : item.id
                      setSelectedCategory(newCategoryId)
                      router.setParams({ categoryId: newCategoryId })
                    }}
                    style={[
                      styles.categoryItem,
                      isSelected && {
                        backgroundColor: colors.lime[500],
                        borderWidth: 0,
                      },
                    ]}
                  >
                    <View style={styles.categoryInfo}>
                      {IconComponent && (
                        <IconComponent size={20} color={colors.zinc[600]} />
                      )}
                      <Text style={styles.categoryName}>{item.name}</Text>
                    </View>
                    {isSelected && (
                      <TouchableOpacity
                        onPress={() => setSelectedCategory(null)}
                      >
                        <IconCircleX size={16} color={colors.zinc[900]} />
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                )
              })}
            </BottomSheetScrollView>

            {/* Status */}
            <Text style={styles.filterItemLabel}>Status:</Text>
            <BottomSheetScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 16,
                paddingHorizontal: 4,
              }}
              style={{ marginBottom: 8 }}
            >
              {statusData.map((item) => {
                const isSelected = selectedStatus === item.id

                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      const newStatus = isSelected ? null : item.id
                      setSelectedStatus(newStatus)
                      router.setParams({ status: newStatus })
                    }}
                    style={[
                      styles.categoryItem,
                      isSelected && {
                        backgroundColor: colors.lime[500],
                        borderWidth: 0,
                      },
                    ]}
                  >
                    <View style={styles.categoryInfo}>
                      {item.icon}
                      <Text style={styles.categoryName}>{item.label}</Text>
                    </View>
                    {isSelected && (
                      <TouchableOpacity onPress={() => setSelectedStatus(null)}>
                        <IconCircleX size={16} color={colors.zinc[900]} />
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                )
              })}
            </BottomSheetScrollView>
          </View>
        </View>
      </BottomSheetModal>
    </View>
  )
}
