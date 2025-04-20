import { colors } from '@/styles/theme'
import { IconDotsVertical, IconRun, IconBell } from '@tabler/icons-react-native'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { Habit } from '@/types/habit'

type HabitCardProps = Habit

export function HabitCard(props: HabitCardProps) {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <View style={styles.headerGroup}>
            <Category />
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
          <IconDotsVertical color={colors.zinc[900]} />
        </View>
        <Text style={styles.description}>Dias no mês: {props.days}</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Completar</Text>
      </TouchableOpacity>
    </View>
  )
}

function Category() {
  return (
    <View style={styles.category}>
      <IconRun color={colors.zinc[900]} size={20} />
    </View>
  )
}
