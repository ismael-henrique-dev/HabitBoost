import { useRef, useMemo, useCallback } from 'react'
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native'
import { BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useCategory } from '@/contexts/category-context'
import { IconChevronRight } from '@tabler/icons-react-native'
import { colors } from '@/styles/theme'
import { styles } from './styles'

type CategorySelectBottomSheetProps = {
  selectedCategoryId: string | null
  onSelectCategory: (id: string) => void
}

export function CategorySelectBottomSheet({
  selectedCategoryId,
  onSelectCategory,
}: CategorySelectBottomSheetProps) {
  const { categories } = useCategory()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const dimensions = useWindowDimensions()
  const snapPoints = useMemo(
    () => [200, 700, dimensions.height - 100],
    [dimensions.height]
  )

  const handleOpen = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  return (
    <View>
      {/* Trigger */}
      <TouchableOpacity onPress={handleOpen} style={styles.trigger}>
        <View style={styles.categoryIcon}>
          {selectedCategoryId && (() => {
            const selectedCategory = categories.find((c) => c.id === selectedCategoryId)
            return selectedCategory?.icon ? <selectedCategory.icon size={24} /> : null
          })()}
        </View>
        <Text style={styles.triggerText}>
          {selectedCategoryId
            ? categories.find((c) => c.id === selectedCategoryId)?.name
            : 'Selecionar categoria'}
        </Text>
      </TouchableOpacity>

      {/* BottomSheetModal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheetBackgroundStyle}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        style={styles.bottomSheetStyle}
        enableOverDrag={true}
        enablePanDownToClose={true}
      >
        <View style={styles.sheetContent}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Categorias</Text>
          </View>
          <BottomSheetFlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => {
                  onSelectCategory(item.id)
                  handleClose()
                }}
              >
                <View style={styles.categoryInfo}>
                  <View style={styles.categoryIcon}>
                    {item.icon && <item.icon size={24} />}
                  </View>
                  <Text style={styles.categoryName}>{item.name}</Text>
                </View>
                <IconChevronRight size={20} color={colors.zinc[600]} />
              </TouchableOpacity>
            )}
          />
        </View>
      </BottomSheetModal>
    </View>
  )
}
