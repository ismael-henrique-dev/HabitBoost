import React, { useRef, useMemo, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import { BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useCategory } from '@/contexts/category-context'
import { IconChevronRight } from '@tabler/icons-react-native'
import { colors, fontFamily } from '@/styles/theme'

type Props = {
  selectedCategoryId: string | null
  onSelectCategory: (id: string) => void
}

export function CategorySelectBottomSheet({
  selectedCategoryId,
  onSelectCategory,
}: Props) {
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
        backgroundStyle={{
          backgroundColor: colors.zinc[50],
          shadowColor: '#000', // Cor da sombra
          shadowOffset: { width: 0, height: 4 }, // Deslocamento da sombra
          shadowOpacity: 0.1, // Opacidade da sombra
          shadowRadius: 10, // Raio de desfoque
          padding: 20
          // elevation: 5, // Sombra para Android
        }}
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
                  <View style={styles.categoryIcon} />
                  <Text style={styles.categoryName}>{item.name}</Text>
                </View>
                <IconChevronRight size={20} color='#555' />
              </TouchableOpacity>
            )}
          />
        </View>
      </BottomSheetModal>
    </View>
  )
}

const styles = StyleSheet.create({
  trigger: {
    width: '100%',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center', // Centraliza verticalmente
    backgroundColor: colors.zinc[200],
    borderRadius: 12,
    height: 48,
  },
  triggerText: {
    color: colors.zinc[600],
    fontSize: 16,
    fontFamily: fontFamily.regular,
  },
  sheetContent: {
    paddingHorizontal: 16,
    flex: 1,
  },
  sheetHeader: {
    marginVertical: 12,
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9fdb3f', // verde limão
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
  },
})
