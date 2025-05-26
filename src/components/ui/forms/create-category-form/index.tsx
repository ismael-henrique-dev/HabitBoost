import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../../input'
import { ErrorMenssage } from '../../error-menssage'
import { Button } from '../../button'
import { router } from 'expo-router'
import { colors } from '@/styles/theme'
import { v4 as uuidv4 } from 'uuid'
import { styles } from './styles'
import {
  CreateCategoryFormData,
  createCategoryFormSchema,
} from '@/validators/category/create-category'
import { Category } from '@/types/category'
import { useCategory } from '@/contexts/category-context'
import React, { useState } from 'react'
import { IconPickerModal } from '../../icon-picker'
import { Pressable } from 'react-native'
import { IconPencil, IconPhoto } from '@tabler/icons-react-native'
import { categoriesIcons } from '@/utils/icons-list'

export function CreateCategoryForm() {
  const [iconModalVisible, setIconModalVisible] = useState(false)
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null)

  const SelectedIcon = selectedIconId ? categoriesIcons[selectedIconId] : null
  const { createCategory } = useCategory()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      name: '',
    },
  })

  const handleCreateCategory = (data: CreateCategoryFormData) => {
    try {
      if (!selectedIconId) {
        alert('Selecione um ícone para a categoria.')
        return
      }

      const category: Category = {
        id: uuidv4(),
        name: data.name,
        isCustom: true,
        iconId: selectedIconId!,
      }

      createCategory(category)
      console.log('Nova categoria: ', category)
      router.back()
    } catch (error) {
      console.error('Erro ao criar categoria:', error)
    }
  }

  return (
    <View style={styles.formContainer}>
      <IconPickerModal
        visible={iconModalVisible}
        selectedIconId={selectedIconId}
        onClose={() => setIconModalVisible(false)}
        onSelect={(icon) => setSelectedIconId(icon)}
      />
      <View style={styles.formGroup}>
        <View style={styles.iconPickerWrapper}>
          <Pressable
            onPress={() => setIconModalVisible(true)}
            style={styles.iconCircle}
          >
            {SelectedIcon ? (
              <SelectedIcon size={40} color={colors.zinc[900]} />
            ) : (
              <IconPhoto size={40} color={colors.zinc[900]} />
            )}

            {/* Botão de editar */}
            <View style={styles.editIconButton}>
              <IconPencil size={16} color={colors.zinc[600]} />
            </View>
          </Pressable>
        </View>
        <Text style={styles.label}>Qual o nome da categoria?</Text>
        <Controller
          control={control}
          name='name'
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder='Insira o nome aqui'
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && <ErrorMenssage>{errors.name.message}</ErrorMenssage>}
      </View>

      <Button variant='secundary' onPress={handleSubmit(handleCreateCategory)}>
        <Button.Title style={{ color: colors.zinc[50] }}>Concluir</Button.Title>
      </Button>
      <Button onPress={() => router.back()}>
        <Button.Title>Cancelar</Button.Title>
      </Button>
    </View>
  )
}
