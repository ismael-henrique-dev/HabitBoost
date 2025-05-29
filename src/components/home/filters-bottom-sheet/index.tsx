import { useRef, useCallback } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useCategory } from '@/contexts/category-context'
import {
  IconFilter
} from '@tabler/icons-react-native'
import { colors } from '@/styles/theme'

import { router } from 'expo-router'
import { categoriesIcons } from '@/utils/icons-list'
import { styles } from './styles'

type CategorySelectBottomSheetProps = {
  selectedCategoryId: string | null
  onSelectCategory: (id: string) => void
}

export function FiltersBottomSheet() {
  const { categories, deleteCategory } = useCategory()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const handleOpen = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  // const selectedCategory = categories.find((c) => c.id === selectedCategoryId)
  // const SelectedIcon = selectedCategory
  //   ? categoriesIcons[selectedCategory.iconId]
  //   : null

  return (
    <View>
      {/* Trigger */}
      <TouchableOpacity onPress={handleOpen} style={styles.filterButton}>
        <IconFilter size={24} color={colors.zinc[900]} />
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
              <Text style={styles.newButtonText}>Limpar filtros</Text>
        
            </TouchableOpacity>
          </View>
          {/* <BottomSheetView>
            <TouchableOpacity style={styles.selectedButtonCategory}>
              <IconCalendar color={colors.zinc[600]} />
              <Text>Data</Text>
            </TouchableOpacity>
          </BottomSheetView> */}
          <BottomSheetFlatList
            data={categories}
            keyExtractor={(category) => category.id}
            renderItem={({ item }) => {
              const IconComponent = categoriesIcons[item.iconId]
              return (
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => {
                    // onSelectCategory(item.id)
                    handleClose()
                  }}
                >
                  <View style={styles.categoryInfo}>
                    <View style={styles.categoryIcon}>
                      {IconComponent && (
                        <IconComponent size={24} color={colors.zinc[900]} />
                      )}
                    </View>
                    <Text style={styles.categoryName}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </BottomSheetModal>
    </View>
  )
}
