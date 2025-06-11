import { colors } from '@/styles/theme'
import { IconBell, IconCheck } from '@tabler/icons-react-native'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { Habit } from '@/types/habit'
import { useHabit } from '@/contexts/habit-context'
import { useCategory } from '@/contexts/category-context'
import { HabitOptionsBottomSheet } from '../habit-opitions-botton-sheet'
import { router } from 'expo-router'
import dayjs from 'dayjs'
import { categoriesIcons } from '@/utils/icons-list'

import { completeHabitOnServer } from '@/services/http/habits/complete-habit'
import { useAuth } from '@/contexts/auth-context'

type HabitCardProps = Habit & {
  selectedDate: string
}

export function HabitCard(props: HabitCardProps) {
  const { isLogged } = useAuth()
  const { completeHabit } = useHabit()
  const today = dayjs().startOf('day').format('YYYY-MM-DD')

  const diasSelecionados = props.days.map((dateStr) =>
    Number(dateStr.split('-')[2])
  )

  const isPendingStatus = ['unstarted', 'missed'].includes(
    props.statusByDate?.[props.selectedDate]
  )

  async function handleCompleteHabit() {
    const isFutureDate = dayjs(props.selectedDate).isAfter(today)

    if (isFutureDate) {
      Alert.alert(
        'Aviso!',
        'Você não pode completar esse hábito em uma data futura.'
      )
      return
    }
    completeHabit(props.id, props.selectedDate)
    // if (isLogged) {
    //   await completeHabitOnServer(props.id, {
    //     date: props.selectedDate,
    //     status: props.statusByDate[props.selectedDate],
    //   })
    //   completeHabit(props.id, props.selectedDate)
    // } else {
    //   completeHabit(props.id, props.selectedDate)
    // }
  }

  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate({
          pathname: '/habit-details',
          params: { habitId: props.id },
        })
      }}
    >
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <View style={styles.headerGroup}>
              <Category categoryId={props.categoryId} />
              <View>
                <Text style={styles.title}>{props.title}</Text>
                {props.reminderTime && (
                  <View style={styles.timeContainer}>
                    <IconBell size={16} color={colors.lime[500]} />
                    <Text style={styles.timeText}>{props.reminderTime}</Text>
                  </View>
                )}
              </View>
            </View>
            <HabitOptionsBottomSheet habitId={props.id} />
          </View>
          <Text style={styles.description}>
            Dias no mês: {diasSelecionados.join(', ')}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            !isPendingStatus && {
              justifyContent: 'space-between',
            },
            isPendingStatus && {
              justifyContent: 'center',
            },
          ]}
          onPress={handleCompleteHabit}
        >
          <Text style={styles.buttonText}>
            {/* {isPendingStatus ? 'Completar' : 'Concluído'} */}
            {props.statusByDate[props.selectedDate] === 'missed' && 'Pendente'}
            {props.statusByDate[props.selectedDate] === 'unstarted' &&
              'Completar'}
            {props.statusByDate[props.selectedDate] === 'concluded' &&
              'Concluído'}
          </Text>
          {props.statusByDate?.[props.selectedDate] === 'concluded' && (
            <IconCheck size={24} color={colors.lime[500]} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

function Category({ categoryId }: { categoryId: string }) {
  const { categories } = useCategory()

  const selectedCategory = categories.find((c) => c.id === categoryId)

  console.log('Id da categororia selecionada: ', selectedCategory)

  if (!selectedCategory) {
    return (
      <View style={styles.category}>
        <Text>Sem categoria</Text>
      </View>
    )
  }

  const CategoryIcon = categoriesIcons[selectedCategory.iconId]

  if (!CategoryIcon) {
    return (
      <View style={styles.category}>
        <Text>Sem ícone</Text>
      </View>
    )
  }

  return (
    <View style={styles.category}>
      <CategoryIcon size={24} color={colors.zinc[900]} />
    </View>
  )
}
