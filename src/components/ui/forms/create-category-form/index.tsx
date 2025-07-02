import { Controller, useForm } from 'react-hook-form'
import { Alert, Text, View } from 'react-native'
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

import { createCategoryOnServer } from '@/services/http/categories/create-category'
import { useAuth } from '@/contexts/auth-context'
import { getErrorMessage } from '@/utils/get-error-menssage'
import { notify } from 'react-native-notificated'

export function CreateCategoryForm() {
  const { isLogged } = useAuth()
  const [iconModalVisible, setIconModalVisible] = useState(false)
  const [selectedIconId, setSelectedIconId] = useState<string>(
    'icon-default-category'
  )
  const [isLoading, setIsloading] = useState(false)

  const SelectedIcon = selectedIconId ? categoriesIcons[selectedIconId] : null
  const { createCategory, customCategories } = useCategory()
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

  const handleCreateCategory = async (data: CreateCategoryFormData) => {
    try {
      setIsloading(true)

      const category: Category = {
        id: uuidv4(),
        name: data.name,
        isCustom: true,
        iconId: selectedIconId!,
      }

      if (customCategories.length >= 5) {
        Alert.alert(
          'Atenção',
          'Você só pode criar até 5 categorias personalizadas.'
        )
        return
      } else {
        if (isLogged) {
          await createCategoryOnServer(category)
          createCategory(category)
        } else {
          createCategory(category)
        }
      }

      console.log('Nova categoria: ', category)

      notify('custom' as any, {
        params: {
          customTitle: 'Categoria criada com sucesso!',
          type: 'success',
        },
        config: {
          duration: 2000,
        },
      })

      router.back()
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
    } finally {
      setIsloading(false)
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

      <Button
        isLoading={isLoading}
        disabled={isLoading}
        variant='secundary'
        onPress={handleSubmit(handleCreateCategory)}
      >
        <Button.Title style={{ color: colors.zinc[50] }}>
          {isLoading ? 'Criando categoria...' : 'Criar categoria'}
        </Button.Title>
      </Button>
      <Button disabled={isLoading} onPress={() => router.back()}>
        <Button.Title>Cancelar</Button.Title>
      </Button>
    </View>
  )
}
