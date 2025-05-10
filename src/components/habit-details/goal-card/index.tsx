import { useHabit } from '@/contexts/habit-context'
import { colors } from '@/styles/theme'
import { IconTargetArrow } from '@tabler/icons-react-native'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { GoalOptionsBottomSheet } from '../goal-options-bottom-sheet'

type GoalCardProps = {
  title: string
  goalId: string
  habitId: string
  currentCount: number
  targetCount: number
}

export function GoalCard(props: GoalCardProps) {
  const { completeGoal } = useHabit()

  const progressPercentage =
    props.targetCount > 0 ? (props.currentCount / props.targetCount) * 100 : 0

  const isDisabled = props.currentCount === props.targetCount

  return (
    <TouchableOpacity
      onPress={() => completeGoal(props.habitId, props.goalId)}
      disabled={isDisabled}
    >
      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalTitle}>{props.title}</Text>
          <GoalOptionsBottomSheet goalId={props.goalId} habitId={props.habitId} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 40,
          }}
        >
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercentage}%` },
                ]}
              />
            </View>
            <Text style={styles.goalProgress}>
              {props.currentCount}/{props.targetCount}
            </Text>
          </View>
          <IconTargetArrow size={32} color={colors.lime[500]} />
        </View>
      </View>
    </TouchableOpacity>
  )
}
