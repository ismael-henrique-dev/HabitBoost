import { colors } from '@/styles/theme'
import { IconDotsVertical, IconRun, IconBell } from '@tabler/icons-react-native'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'

type HabitCardProps = {
  title: string
  description: string
  time: string
  category: string
}

export function HabitCard() {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <View style={styles.headerGroup}>
            <Category />
            <View>
              <Text style={styles.title}>Treinar</Text>
              <View style={styles.timeContainer}>
                <IconBell size={16} color={colors.lime[500]} />
                <Text style={styles.timeText}>16:00</Text>
              </View>
            </View>
          </View>
          <IconDotsVertical color={colors.zinc[900]} />
        </View>
        <Text style={styles.description}>Dias no mês: 3, 6, 6, 8</Text>
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
