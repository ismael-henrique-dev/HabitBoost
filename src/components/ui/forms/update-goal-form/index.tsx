import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { router, useLocalSearchParams } from 'expo-router'
import { styles } from './styles'
import { colors } from '@/styles/theme'
import { Input } from '../../input'
import { Button } from '../../button'
import { ErrorMenssage } from '../../error-menssage'
import { useGoal } from '@/contexts/goal-context'
import { Goal } from '@/types/goal'
import {
  UpdateGoalFormData,
  updateGoalFormSchema,
} from '@/validators/goals/update-goal'
import { updateGoalOnServer } from '@/services/http/goals/update-goal'
import { useAuth } from '@/contexts/auth-context'
import { getErrorMessage } from '@/utils/get-error-menssage'
import { notify } from 'react-native-notificated'

export function UpdateGoalForm() {
  const { isLogged } = useAuth()
  const { updateGoal, goals } = useGoal()
  const { goalId } = useLocalSearchParams()

  const goal = goals.find((goal) => goal.id === goalId)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateGoalFormData>({
    resolver: zodResolver(updateGoalFormSchema),
    defaultValues: {
      title: goal?.title ?? '',
      currentCount: goal?.currentCount ?? 1,
      targetCount: goal?.targetCount ?? 1,
    },
  })

  const handleUpdateGoal = async (data: UpdateGoalFormData) => {
    try {
      if (!goal) return

      const updatedGoal: Goal = {
        ...goal,
        title: data.title,
        currentCount: data.currentCount,
        targetCount: data.targetCount,
        updatedAt: new Date(),
      }

      if (isLogged) {
        await updateGoalOnServer(goal.id, updatedGoal)
        updateGoal(goal.id, updatedGoal)
      } else {
        updateGoal(goal.id, updatedGoal)
      }

      notify('custom' as any, {
        params: {
          customTitle: 'Meta atualizada com sucesso!',
          type: 'success',
        },
        config: {
          duration: 2000,
        },
      })

      router.back()

      if (!goal) {
        return (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Meta não encontrada.</Text>
          </View>
        )
      }
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
      console.error('Erro ao atualizar meta: ', error)
    }

    return (
      <View style={styles.formContainer}>
        {/* Título da meta */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Qual atividade?</Text>
          <Controller
            control={control}
            name='title'
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder='Correr 3x ao mês, pedalar por 3 horas...'
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.title && (
            <ErrorMenssage>{errors.title.message}</ErrorMenssage>
          )}
        </View>

        {/* Quantidade atual */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Quantas vezes já foi completada?</Text>
          <Controller
            control={control}
            name='currentCount'
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder='1x'
                value={value?.toString() ?? ''}
                onChangeText={(text) => {
                  const number = Number(text)
                  onChange(isNaN(number) ? 0 : number)
                }}
                keyboardType='numeric'
              />
            )}
          />
          {errors.currentCount && (
            <ErrorMenssage>{errors.currentCount.message}</ErrorMenssage>
          )}
        </View>

        {/* Meta final */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Quantas vezes realizará à atividade?</Text>
          <Controller
            control={control}
            name='targetCount'
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder='1x'
                value={value?.toString() ?? ''}
                onChangeText={(text) => {
                  const number = Number(text)
                  onChange(isNaN(number) ? 0 : number)
                }}
                keyboardType='numeric'
              />
            )}
          />
          {errors.targetCount && (
            <ErrorMenssage>{errors.targetCount.message}</ErrorMenssage>
          )}
        </View>

        {/* Botões */}
        <Button variant='secundary' onPress={handleSubmit(handleUpdateGoal)}>
          <Button.Title style={{ color: colors.zinc[50] }}>
            Concluir
          </Button.Title>
        </Button>

        <Button onPress={() => router.back()}>
          <Button.Title>Cancelar</Button.Title>
        </Button>
      </View>
    )
  }
}
