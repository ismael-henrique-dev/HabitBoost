import { Controller, useForm } from 'react-hook-form'
import { Text, TouchableOpacity, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { HabitFormData, habitFormSchema } from '@/validators/habit/create-habit'
import { Input } from '../../input'
import { Button } from '../../button'
import { ErrorMenssage } from '../../error-menssage'
import { CategorySelectBottomSheet } from '../../select'
import { styles } from './styles'
import { router, useLocalSearchParams } from 'expo-router'
import { colors, fontFamily } from '@/styles/theme'
import { Calendar } from '../../calendar'
import { useHabit } from '@/contexts/habit-context'
import { notify } from 'react-native-notificated'
import { Habit } from '@/types/habit'
import { updateHabitOnServer } from '@/services/http/habits/update-habit'
import { useAuth } from '@/contexts/auth-context'
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { getErrorMessage } from '@/utils/get-error-menssage'
import { cancelAllNotificationsForHabit } from '@/utils/cancel-all-notifications-for-habit'
import { convertTimeStringToDate } from '@/utils/convert-time-string-to-date'
import { createNotify } from '@/utils/create-notification'
import { saveNotificationId } from '@/utils/save-notification-id'
import { IconX } from '@tabler/icons-react-native'

export function UpdateHabitForm() {
  const { isLogged } = useAuth()
  const { habitId } = useLocalSearchParams()
  const { updateHabit, habits } = useHabit()

  const habit = habits.find((habit) => habit.id === habitId)

  const {
    control,
    handleSubmit,
    setValue,
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
      description: habit?.description ?? '',
      reminderTime: habit?.reminderTime ?? '',
    },
  })

  const [date, setDate] = useState(() => {
    if (habit?.reminderTime) {
      const [hour, minute] = habit.reminderTime.split(':').map(Number)
      const now = new Date()
      now.setHours(hour)
      now.setMinutes(minute)
      now.setSeconds(0)
      return now
    }
    return new Date()
  })

  const handleUpdateHabit = async (data: HabitFormData) => {
    try {
      console.log('Atualização do hábito:', data)

      const selectedDays = Object.entries(data.days)
        .filter(([_, value]) => value.selected)
        .map(([key]) => key)

      console.log('Dias selecionados:', selectedDays)

      if (habit) {
        // Cancela todas as notificações antigas relacionadas a esse hábito e cria novas

        if (data.reminderTime && selectedDays.length > 0) {
          cancelAllNotificationsForHabit(habit.id)

          let count = 0

          for (let i = 0; i < selectedDays.length; i++) {
            const convertedDate = convertTimeStringToDate(
              selectedDays[i],
              data.reminderTime
            )

            console.log('Data convertida:', convertedDate.toLocaleString())
            console.log('Agora:', new Date().toLocaleString())

            if (convertedDate.getTime() > Date.now()) {
              const notificationId = await createNotify(
                convertedDate,
                habit.title
              )
              await saveNotificationId(habit.id, notificationId)
              count++
            }
          }

          if (count > 0) {
            notify('custom' as any, {
              params: {
                customTitle: `${count} lembrete(s) agendado(s) com sucesso!`,
                type: 'success',
              },
              config: {
                duration: 3000,
              },
            })
          } else {
            notify('custom' as any, {
              params: {
                customTitle: `Nenhum lembrete foi agendado, pois os horários estavam no passado.`,
                type: 'warning',
              },
              config: {
                duration: 4000,
              },
            })
          }
        }

        const updatedHabit: Habit = {
          ...habit,
          days: selectedDays,
          ...(data.description && { description: data.description }),
          ...(data.reminderTime && { reminderTime: data.reminderTime }),
          categoryId: data.category,
          title: data.title,
          updatedAt: new Date(),
        }

        console.log('habito atualizado: ', updatedHabit)

        if (isLogged) {
          await updateHabitOnServer(habitId as string, updatedHabit)
          updateHabit(habitId as string, updatedHabit)
        } else {
          updateHabit(habitId as string, updatedHabit)
        }
      }

      notify('custom' as any, {
        params: {
          customTitle: 'Habito atualizado com sucesso!',
          type: 'success',
        },
        config: {
          duration: 2000,
        },
      })
      router.navigate('/')
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
      console.error('Erro ao atualizar o hábito:', error)
    }
  }

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    if (selectedDate) {
      setDate(selectedDate)

      const timeString = selectedDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })

      setValue('reminderTime', timeString)
    }
  }

  const showTimepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'time',
      is24Hour: true,
      display: 'clock',
      minimumDate: new Date(),
    })
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
      {/* <View style={styles.formGroup}> */}
        {/* <Text style={styles.label}>Horário do lembrete:</Text> */}
        {/* <TouchableOpacity onPress={showTimepicker}> */}
        {/* <Controller
          control={control}
          name='reminderTime'
          render={({ field: { value } }) => (
            <Input
              placeholder={
                value ? `Selecionado: ${value}` : 'Selecionar horário(opcional)'
              }
              value={value}
              onPress={showTimepicker}
            />
          )}
        /> */}
        {/* </TouchableOpacity> */}
      {/* </View> */}

      <View style={styles.formGroup}>
        <Text style={styles.label}>Horário do lembrete:</Text>
        {/* <TouchableOpacity onPress={showTimepicker}> */}
        <Controller
          control={control}
          name='reminderTime'
          render={({ field: { value, onChange } }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                height: 48,
                paddingHorizontal: 12,
                backgroundColor: colors.zinc[200],
                borderRadius: 12,
              }}
            >
              <Text
                onPress={showTimepicker}
                style={{
                  fontSize: 16,
                  fontFamily: fontFamily.regular,
                  color: colors.zinc[600],
                }}
              >
                {value
                  ? `Selecionado: ${value}`
                  : 'Selecionar horário(opcional)'}
              </Text>
              <TouchableOpacity onPress={() => onChange('')}>
                <IconX size={20} color={colors.zinc[600]} />
              </TouchableOpacity>
            </View>
          )}
        />
        {/* </TouchableOpacity> */}
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
