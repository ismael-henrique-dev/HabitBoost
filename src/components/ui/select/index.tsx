import { useRef, useMemo, useCallback } from 'react'
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native'
import { BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useCategory } from '@/contexts/category-context'
import {
  IconCategory,
  IconChevronRight,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react-native'
import { colors } from '@/styles/theme'
import { styles } from './styles'
import { router } from 'expo-router'

type CategorySelectBottomSheetProps = {
  selectedCategoryId: string | null
  onSelectCategory: (id: string) => void
}

export function CategorySelectBottomSheet({
  selectedCategoryId,
  onSelectCategory,
}: CategorySelectBottomSheetProps) {
  const { categories, deleteCategory } = useCategory()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // const dimensions = useWindowDimensions()
  // const snapPoints = useMemo(
  //   () => [200, 700, dimensions.height - 100],
  //   [dimensions.height]
  // )

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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.categoryIcon}>
            {selectedCategoryId &&
              (() => {
                const selectedCategory = categories.find(
                  (c) => c.id === selectedCategoryId
                )
                return selectedCategory?.icon ? (
                  <selectedCategory.icon size={20} />
                ) : null
              })()}
            {!selectedCategoryId && (
              <IconCategory size={20} color={colors.zinc[900]} />
            )}
          </View>
          <Text style={styles.triggerText}>
            {selectedCategoryId
              ? categories.find((c) => c.id === selectedCategoryId)?.name
              : 'Selecionar categoria'}
          </Text>
        </View>
        <IconChevronRight color={colors.zinc[600]} />
      </TouchableOpacity>

      {/* BottomSheetModal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={[440]}
        backgroundStyle={styles.bottomSheetBackgroundStyle}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        style={styles.bottomSheetStyle}
        enableOverDrag={true}
        enablePanDownToClose={true}
      >
        <View style={styles.sheetContent}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Categorias</Text>
            <TouchableOpacity
              onPress={() => {
                handleClose()
                router.navigate('/create-category')
              }}
              style={styles.newButton}
            >
              <Text style={styles.newButtonText}>Nova</Text>
              <IconPlus size={24} color={colors.zinc[900]} />
            </TouchableOpacity>
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
                {item.isCustom ? (
                  <TouchableOpacity onPress={() => deleteCategory(item.id)}>
                    <IconTrash size={20} color={colors.zinc[600]} />
                  </TouchableOpacity>
                ) : (
                  <IconChevronRight size={20} color={colors.zinc[600]} />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </BottomSheetModal>
    </View>
  )
}
