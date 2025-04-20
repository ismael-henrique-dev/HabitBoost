import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createHabitFormSchema,
  CreateHabitFormData,
} from '@/validators/habit/create-habit'
import { Input } from '../input'
import { Button } from '../button'
import { ErrorMenssage } from '../error-menssage'
import { CategorySelectBottomSheet } from '../select'

export function CreateHabitForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateHabitFormData>({
    resolver: zodResolver(createHabitFormSchema),
  })

  const handleCreateHabit = (data: CreateHabitFormData) => {
    try {
      console.log('Novo hábito:', data)
    } catch (error) {
      console.error('Erro ao criar hábito:', error)
    }
  }

  return (
    <View style={styles.formContainer}>
      {/* Title */}
      <Controller
        control={control}
        name='title'
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder='Qual o nome do seu hábito?'
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.title && <ErrorMenssage>{errors.title.message}</ErrorMenssage>}

      {/* Description */}
      <Controller
        control={control}
        name='description'
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder='Descrição (opcional)'
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.description && (
        <ErrorMenssage>{errors.description.message}</ErrorMenssage>
      )}

      {/* Relógio aqui dps */}
      <Controller
        control={control}
        name='reminderTime'
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder='Horário do lembrete (opcional)'
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.reminderTime && (
        <ErrorMenssage>{errors.reminderTime.message}</ErrorMenssage>
      )}

      {/* select com as categorias */}
      <Controller
        control={control}
        name='category'
        render={({ field: { onChange, value } }) => (
          <CategorySelectBottomSheet
            selectedCategoryId={value}
            onSelectCategory={onChange}
          />
        )}
      />
      {errors.category && (
        <ErrorMenssage>{errors.category.message}</ErrorMenssage>
      )}

      {/* Days - Você pode trocar por um MultiSelect ou Checkbox */}
      <Controller
        control={control}
        name='days'
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder='Dias do mês: ex. 1, 5, 10'
            value={value}
            onChangeText={(text) =>
              onChange(
                text
                  .split(',')
                  .map((d) => Number(d.trim()))
                  .filter((n) => !isNaN(n))
              )
            }
          />
        )}
      />
      {errors.days && <ErrorMenssage>{errors.days.message}</ErrorMenssage>}

      <Button
        variant='secundary'
        onPress={handleSubmit(handleCreateHabit)}
        // disabled={!isValid}
        // isLoading={isLoading}
      >
        <Button.Title style={{ color: 'white' /* colors.zinc[50] */ }}>
          Concluir
        </Button.Title>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    gap: 20,
  },
})
