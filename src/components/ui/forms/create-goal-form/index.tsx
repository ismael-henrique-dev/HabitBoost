import { Controller, useForm } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
import { styles } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CreateGoalFormData,
  createGoalFormSchema,
} from '@/validators/goals/create-goal'
import { Input } from '../../input'
import { ErrorMenssage } from '../../error-menssage'
import { Button } from '../../button'
import { router, useLocalSearchParams } from 'expo-router'
import { colors } from '@/styles/theme'
import { useHabit } from '@/contexts/habit-context'
import { Goal } from '@/types/goal'
import { v4 as uuidv4 } from 'uuid';


export function CreateGoalForm() {
  const { addGoalToHabit } = useHabit()
  const { habitId } = useLocalSearchParams()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGoalFormData>({
    resolver: zodResolver(createGoalFormSchema),
    defaultValues: {
      title: '',
      targetCount: 1,
    },
  })

  const handleCreateGoal = (data: CreateGoalFormData) => {
    try {
      console.log('Nova meta:', data)
      console.log('Id da meta: ', habitId)

      router.back()

      const goal: Goal = {
        id: uuidv4(),
        createdAt: new Date(),
        currentCount: 0,
        targetCount: data.targetCount,
        title: data.title
      }

      addGoalToHabit(habitId as string, goal)
    } catch (error) {
      console.error('Erro ao criar hábito:', error)
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

      <Button variant='secundary' onPress={handleSubmit(handleCreateGoal)}>
        <Button.Title style={{ color: colors.zinc[50] }}>Concluir</Button.Title>
      </Button>
      <Button onPress={() => router.back()}>
        <Button.Title>Cancelar</Button.Title>
      </Button>
    </View>
  )
}
