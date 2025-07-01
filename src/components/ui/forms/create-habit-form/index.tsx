import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { HabitFormData, habitFormSchema } from '@/validators/habit/create-habit'
import { Input } from '../../input'
import { Button } from '../../button'
import { ErrorMenssage } from '../../error-menssage'
import { CategorySelectBottomSheet } from '../../select'
import { styles } from './styles'
import { router } from 'expo-router'
import { colors } from '@/styles/theme'
import { Calendar } from '../../calendar'
import { useHabit } from '@/contexts/habit-context'

import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { createHabitOnServer } from '@/services/http/habits/create-habit'
import { useAuth } from '@/contexts/auth-context'
import { getErrorMessage } from '@/utils/get-error-menssage'
import { convertTimeStringToDate } from '@/utils/convert-time-string-to-date'
import { createNotify } from '@/utils/create-notification'
import { notify } from 'react-native-notificated'
import { createNotificationsChannel } from '@/utils/create-notification-channel'
import { saveNotificationId } from '@/utils/save-notification-id'

export function CreateHabitForm() {
  const { isLogged } = useAuth()
  const [date, setDate] = useState(new Date())
  const { createHabit } = useHabit()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<HabitFormData>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: {
      days: {},
      title: '',
      category: '',
    },
  })

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

  const handleCreateHabit = async (data: HabitFormData) => {
    try {
      console.log('Novo hábito:', data)

      const selectedDays = Object.entries(data.days)
        .filter(([_, value]) => value.selected)
        .map(([key]) => key)

      const statusByDate = selectedDays.reduce((acc, date) => {
        acc[date] = 'unstarted'
        return acc
      }, {} as Record<string, 'unstarted'>)

      const newHabit = {
        id: uuidv4(),
        days: selectedDays,
        statusByDate,
        title: data.title,
        categoryId: data.category,
        createdAt: new Date(),
        updatedAt: null,
        ...(data.description && { description: data.description }),
        ...(data.reminderTime && { reminderTime: data.reminderTime }),
      }

      console.log('Novo hábito: ' + newHabit)

      if (data.reminderTime && selectedDays.length > 0) {
        createNotificationsChannel()

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
              newHabit.title
            )
            await saveNotificationId(newHabit.id, notificationId)
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

      if (isLogged) {
        await createHabitOnServer(newHabit)
        createHabit(newHabit)
      } else {
        createHabit(newHabit)
      }

      router.navigate('/')

      notify('custom' as any, {
        params: {
          customTitle: 'Habito criado com sucesso!',
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
        {/* <TouchableOpacity onPress={showTimepicker}> */}
        <Controller
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

      <Button variant='secundary' onPress={handleSubmit(handleCreateHabit)}>
        <Button.Title style={{ color: colors.zinc[50] }}>Concluir</Button.Title>
      </Button>
      <Button onPress={() => router.back()}>
        <Button.Title>Cancelar</Button.Title>
      </Button>
    </View>
  )
}
