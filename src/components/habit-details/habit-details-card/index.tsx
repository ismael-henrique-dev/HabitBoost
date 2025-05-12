import { Separator } from '@/components/ui/separator'
import { colors, fontFamily } from '@/styles/theme'
import { IconBell, IconCheck } from '@tabler/icons-react-native'
import { Text, View } from 'react-native'
import { styles } from './styles'
import { Habit } from '@/types/habit'
import { useCategory } from '@/contexts/category-context'

type HabitDetailsCardProps = {
  habit: Habit
}

export function HabitDetailsCard({ habit }: HabitDetailsCardProps) {
  const selectedDays = Array.isArray(habit.days)
    ? habit.days.map((date) => new Date(date).getDate())
    : []
  const { categories } = useCategory()

  const selectedCategory = categories.find((c) => c.id === habit.categoryId)

  const CategoryIcon = selectedCategory?.icon

  return (
    <View style={styles.habitCard}>
      <View style={styles.habitInfoColumn}>
        <View style={styles.iconCircle}>
          {CategoryIcon && <CategoryIcon size={24} color={colors.zinc[900]} />}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.habitTitle}>{habit.title}</Text>
          <IconCheck color={colors.zinc[900]} /> {/* Arrumar o status depois */}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Text style={{ fontSize: 14, fontFamily: fontFamily.regular }}>
            dias no mês: {selectedDays.join(', ')}
          </Text>
          {habit.reminderTime && (
            <>
              <Separator />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            </>
          )}
        </View>
      </View>

      {habit.description && (
        <Text style={styles.habitDescription}>{habit.description}</Text>
      )}
    </View>
  )
}
