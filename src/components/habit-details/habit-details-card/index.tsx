import { Separator } from '@/components/ui/separator'
import { colors, fontFamily } from '@/styles/theme'
import {
  IconBell,
  IconCheck,
  IconCircleHalfVertical,
  IconHourglassHigh,
} from '@tabler/icons-react-native'
import { Text, View } from 'react-native'
import { styles } from './styles'
import { Habit } from '@/types/habit'
import { useCategory } from '@/contexts/category-context'
import { categoriesIcons } from '@/utils/icons-list'

type HabitDetailsCardProps = {
  habit: Habit
  selectedDate: string
}

export function HabitDetailsCard({
  habit,
  selectedDate,
}: HabitDetailsCardProps) {
  const selectedDays = Array.isArray(habit.days)
    ? habit.days.map((date) => new Date(date).getDate())
    : []
  const { categories } = useCategory()

  const selectedCategory = categories.find((c) => c.id === habit.categoryId)!

  const CategoryIcon = categoriesIcons[selectedCategory.iconId!]

  return (
    <View style={styles.habitCard}>
      <View style={styles.habitInfoColumn}>
        <View style={styles.iconCircle}>
          {CategoryIcon && <CategoryIcon size={24} color={colors.zinc[900]} />}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.habitTitle}>{habit.title}</Text>
          {habit.statusByDate[selectedDate] === 'concluded' && (
            <IconCheck color={colors.zinc[900]} size={20} />
          )}
          {habit.statusByDate[selectedDate] === 'unstarted' && (
            <IconCircleHalfVertical color={colors.zinc[900]} size={20} />
          )}
          {habit.statusByDate[selectedDate] === 'missed' && (
            <IconHourglassHigh color={colors.zinc[900]} size={20} />
          )}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Text style={{ fontSize: 14, fontFamily: fontFamily.regular }}>
            dias no mês: {selectedDays.join(', ')}
          </Text>
          {habit.reminderTime && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Separator />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 8,
                }}
              >
                <IconBell color={colors.zinc[900]} size={16} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fontFamily.regular,
                    marginLeft: 4,
                  }}
                >
                  {habit.reminderTime}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {habit.description && (
        <Text style={styles.habitDescription}>{habit.description}</Text>
      )}
    </View>
  )
}
