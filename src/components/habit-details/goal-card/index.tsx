import { colors, fontFamily } from '@/styles/theme'
import { IconDotsVertical, IconTargetArrow } from '@tabler/icons-react-native'
import { StyleSheet, Text, View } from 'react-native'

type GoalCardProps = {
  title: string
  id: string
  currentCount: number
  targetCount: number
}

export function GoalCard(props: GoalCardProps) {
  return (
    <View style={styles.goalCard}>
      <View style={styles.goalHeader}>
        <Text style={styles.goalTitle}>{props.title}</Text>
        <IconDotsVertical color={colors.zinc[900]} size={24} />
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
            <View style={[styles.progressBarFill, { width: '50%' }]} />
          </View>
          <Text style={styles.goalProgress}>
            {props.currentCount}/{props.targetCount}
          </Text>
        </View>
        <IconTargetArrow size={32} color={colors.lime[500]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  goalCard: {
    backgroundColor: colors.zinc[50],
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 40,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalTitle: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.zinc[900],
    flex: 1,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  progressBarBackground: {
    height: 16,
    backgroundColor: colors.zinc[200],
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.lime[500],
  },
  goalProgress: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    marginLeft: 8,
  },
})
