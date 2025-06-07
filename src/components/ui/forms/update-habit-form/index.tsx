import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { HabitFormData, habitFormSchema } from '@/validators/habit/create-habit'
import { Input } from '../../input'
import { Button } from '../../button'
import { ErrorMenssage } from '../../error-menssage'
import { CategorySelectBottomSheet } from '../../select'
import { styles } from './styles'
import { router, useLocalSearchParams } from 'expo-router'
import { colors } from '@/styles/theme'
import { Calendar } from '../../calendar'
import { useHabit } from '@/contexts/habit-context'
import { notify } from 'react-native-notificated'
import { Habit } from '@/types/habit'
import { updateHabitOnServer } from '@/services/http/habits/update-habit'

export function UpdateHabitForm() {
  const { habitId } = useLocalSearchParams()
  const { updateHabit, habits } = useHabit()

  const habit = habits.find((habit) => habit.id === habitId)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HabitFormData>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: {
      days: habit?.days?.reduce((acc, day) => {
        acc[day] = { selected: true }
        return acc
      }, {} as Record<string, { selected: boolean }>),
      title: habit?.title ?? '',
      category: habit?.categoryId ?? '',
      description: '',
      reminderTime: '',
    },
  })

  const handleUpdateHabit = async (data: HabitFormData) => {
    try {
      console.log('Atualização do hábito:', data)

      const selectedDays = Object.entries(data.days)
        .filter(([_, value]) => value.selected)
        .map(([key]) => key)

      console.log('Dias selecionados:', selectedDays)

      if (habit) {
        const updatedHabit: Habit = {
          ...habit,
          days: selectedDays,
          description: data.description,
          reminderTime: data.reminderTime,
          categoryId: data.category,
          title: data.title,
          updatedAt: new Date(),
        }

        console.log('habito atualizado: ', updatedHabit)

        updateHabit(habitId as string, updatedHabit)
        await updateHabitOnServer(habitId as string, updatedHabit)
      }

      router.navigate('/')

      // notify('custom', {
      //   params: {
      //     customTitle: 'Habito criado com sucesso!',
      //     type: 'success',
      //   },
      //   config: {
      //     duration: 2000,
      //   },
      // })
    } catch (error) {
      console.error('Erro ao criar hábito:', error)
    }
  }

  return (
    <View style={styles.formContainer}>
      {/* Title */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Qual o nome do seu habito?</Text>
        <Controller
          control={control}
          name='title'
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder='Treinar, correr, pedalar...'
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.title && <ErrorMenssage>{errors.title.message}</ErrorMenssage>}
      </View>
      {/* Description */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Descrição:</Text>
        <Controller
          control={control}
          name='description'
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder='Opcional'
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.description && (
          <ErrorMenssage>{errors.description.message}</ErrorMenssage>
        )}
      </View>
      {/* Relógio aqui dps */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Horário do lembrete:</Text>
        <Controller
          control={control}
          name='reminderTime'
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder='Opcional'
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.reminderTime && (
          <ErrorMenssage>{errors.reminderTime.message}</ErrorMenssage>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Período de realização dos habitos:</Text>
        <Controller
          control={control}
          name='days'
          render={({ field: { onChange, value } }) => (
            <Calendar onSelectDate={onChange} selectedDates={value} />
          )}
        />
        {errors.days?.message && (
          <ErrorMenssage>{String(errors.days?.message)}</ErrorMenssage>
        )}
      </View>

      {/* select com as categorias */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Categoria do habito:</Text>
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
      </View>

      <Button variant='secundary' onPress={handleSubmit(handleUpdateHabit)}>
        <Button.Title style={{ color: colors.zinc[50] }}>Concluir</Button.Title>
      </Button>
      <Button onPress={() => router.back()}>
        <Button.Title>Cancelar</Button.Title>
      </Button>
    </View>
  )
}
