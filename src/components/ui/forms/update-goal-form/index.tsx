import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { styles } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../../input'
import { ErrorMenssage } from '../../error-menssage'
import { Button } from '../../button'
import { router, useLocalSearchParams } from 'expo-router'
import { colors } from '@/styles/theme'
import { useHabit } from '@/contexts/habit-context'
import { Goal } from '@/types/goal'
import {
  UpdateGoalFormData,
  updateGoalFormSchema,
} from '@/validators/goals/update-goal'

export function UpdateGoalForm() {
  const { updateGoalInHabit, habits } = useHabit()
  const { habitId, goalId } = useLocalSearchParams()

  const habit = habits.find((habit) => habit.id === (habitId as string))

  if (!habit || !habit.goals) {
    console.error('Hábito ou metas não encontradas')
    return null
  }

  const goalToUpdate = habit.goals.find((goal) => goal.id === goalId)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateGoalFormData>({
    resolver: zodResolver(updateGoalFormSchema),
    defaultValues: {
      title: goalToUpdate?.title ?? '',
      currentCount: goalToUpdate?.currentCount ?? 1,
      targetCount: goalToUpdate?.targetCount ?? 1,
    },
  })

  const handleUpdateGoal = (data: UpdateGoalFormData) => {
    try {
      if (!goalToUpdate) {
        throw new Error('Meta não encontrada.')
      }

      const updatedGoal: Goal = {
        ...goalToUpdate,
        title: data.title,
        currentCount: data.currentCount,
        targetCount: data.targetCount,
        updatedAt: new Date(),
      }

      updateGoalInHabit(habitId as string, goalId as string, updatedGoal)
      router.back()
    } catch (error) {
      console.error('Erro ao atualizar a meta:', error)
    }
  }

  return (
    <View style={styles.formContainer}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Qual atividade?</Text>
        <Controller
          control={control}
          name='title'
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder='Correr 3x vezes ao mês, pedalar por 3 horas...'
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.title && <ErrorMenssage>{errors.title.message}</ErrorMenssage>}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Quantas vezes já foi completada?</Text>
        <Controller
          control={control}
          name='currentCount'
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder='1x'
              value={value?.toString() ?? ''}
              onChangeText={(text) => {
                const numeric = Number(text)
                onChange(isNaN(numeric) ? 0 : numeric)
              }}
              keyboardType='numeric'
            />
          )}
        />

        {errors.currentCount && (
          <ErrorMenssage>{errors.currentCount.message}</ErrorMenssage>
        )}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Quantas vezes realizará à atividade?</Text>
        <Controller
          control={control}
          name='targetCount'
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder='1x'
              value={value?.toString() ?? ''}
              onChangeText={(text) => {
                const numeric = Number(text)
                onChange(isNaN(numeric) ? 0 : numeric)
              }}
              keyboardType='numeric'
            />
          )}
        />

        {errors.targetCount && (
          <ErrorMenssage>{errors.targetCount.message}</ErrorMenssage>
        )}
      </View>

      <Button variant='secundary' onPress={handleSubmit(handleUpdateGoal)}>
        <Button.Title style={{ color: colors.zinc[50] }}>Concluir</Button.Title>
      </Button>
      <Button onPress={() => router.back()}>
        <Button.Title>Cancelar</Button.Title>
      </Button>
    </View>
  )
}
