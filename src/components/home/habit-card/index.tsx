import { colors } from '@/styles/theme'
import { IconBell, IconCheck } from '@tabler/icons-react-native'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { Habit } from '@/types/habit'
import { useHabit } from '@/contexts/habit-context'
import { useCategory } from '@/contexts/category-context'
import { HabitOptionsBottomSheet } from '../habit-opitions-botton-sheet'
import { router } from 'expo-router'

type HabitCardProps = Habit

export function HabitCard(props: HabitCardProps) {
  const { completeHabit } = useHabit()

  const diasSelecionados = props.days.map((date) => new Date(date).getDate())

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
            props.status === 'concluded' && { justifyContent: 'space-between' },
            props.status === 'unstarted' && { justifyContent: 'center' },
          ]}
          onPress={() => completeHabit(props.id)}
        >
          <Text style={styles.buttonText}>
            {props.status === 'unstarted' ? 'Completar' : 'Concluído'}
          </Text>
          {props.status === 'concluded' && (
            <IconCheck color={colors.lime[500]} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

function Category({ categoryId }: { categoryId: string }) {
  console.log('Id da categoria: ', categoryId)
  const { categories } = useCategory()
  return (
    <View style={styles.category}>
      {categoryId &&
        (() => {
          const selectedCategory = categories.find((c) => c.id === categoryId)
          return selectedCategory?.icon ? (
            <selectedCategory.icon size={24} color={colors.zinc[900]} />
          ) : null
        })()}
    </View>
  )
}
