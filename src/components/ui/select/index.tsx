import { useRef, useCallback } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
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
import { categoriesIcons } from '@/utils/icons-list'

import { deleteCategoryOnServer } from '@/services/http/categories/delete-category'
import { useAuth } from '@/contexts/auth-context'
import { getErrorMessage } from '@/utils/get-error-menssage'
import { notify } from 'react-native-notificated'

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
  const { isLogged } = useAuth()

  const handleDeleteCategory = async (id: string) => {
    try {
      if (isLogged) {
        await deleteCategoryOnServer(id)
        deleteCategory(id)
      } else {
        deleteCategory(id)
      }

      notify('custom' as any, {
        params: {
          customTitle: 'Categoria deletada com sucesso!',
          type: 'success',
        },
        config: {
          duration: 2000,
        },
      })
    } catch (responseError) {
      const error = getErrorMessage(responseError)

      notify('custom' as any, {
        params: {
          customTitle: error,
          type: 'error',
        },
        config: {
          duration: 2000,
        },
      })
    }
  }

  const handleOpen = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)
  const SelectedIcon = selectedCategory
    ? categoriesIcons[selectedCategory.iconId]
    : null

  return (
    <View>
      {/* Trigger */}
      <TouchableOpacity onPress={handleOpen} style={styles.trigger}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.categoryIcon}>
            {SelectedIcon ? (
              <SelectedIcon size={20} color={colors.zinc[900]} />
            ) : (
              <IconCategory size={20} color={colors.zinc[900]} />
            )}
          </View>
          <Text style={styles.triggerText}>
            {selectedCategory ? selectedCategory.name : 'Selecionar categoria'}
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
            keyExtractor={(category) => category.id}
            renderItem={({ item }) => {
              const IconComponent = categoriesIcons[item.iconId]
              return (
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => {
                    onSelectCategory(item.id)
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
                  {item.isCustom ? (
                    <TouchableOpacity
                      onPress={() => handleDeleteCategory(item.id)}
                    >
                      <IconTrash size={20} color={colors.zinc[600]} />
                    </TouchableOpacity>
                  ) : (
                    <IconChevronRight size={20} color={colors.zinc[600]} />
                  )}
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </BottomSheetModal>
    </View>
  )
}
