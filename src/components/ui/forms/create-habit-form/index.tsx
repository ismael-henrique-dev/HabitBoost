import { Controller, useForm } from 'react-hook-form'
import { Text, TouchableOpacity, View } from 'react-native'
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
import { notify } from 'react-native-notificated'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { createHabitOnServer } from '@/services/http/habits/create-habit'
import { useAuth } from '@/contexts/auth-context'


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

      if (isLogged) {
        await createHabitOnServer(newHabit)
        createHabit(newHabit)
      } else {
        createHabit(newHabit)
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
        <TouchableOpacity onPress={showTimepicker}>
          <Controller
            control={control}
            name='reminderTime'
            render={({ field: { value } }) => (
              <Text style={{ color: colors.lime[500], fontSize: 16 }}>
                {value ? `Selecionado: ${value}` : 'Selecionar horário'}
              </Text>
            )}
          />
        </TouchableOpacity>
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
