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

type HabitCardProps = Habit & {
  selectedDate: string
}

export function HabitCard(props: HabitCardProps) {
  const { completeHabit } = useHabit()
  const today = dayjs().startOf('day').format('YYYY-MM-DD')

  const diasSelecionados = props.days.map((dateStr) =>
    Number(dateStr.split('-')[2])
  )

  const isPendingStatus = ['unstarted', 'missed', 'pending'].includes(
    props.statusByDate?.[props.selectedDate]
  )

  function handleCompleteHabit() {
    if (today !== props.selectedDate) {
      Alert.alert('Aviso!', 'Você não pode completar esse hábito hoje.')
    }

    completeHabit(props.id)
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
            {isPendingStatus ? 'Completar' : 'Concluído'}
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

