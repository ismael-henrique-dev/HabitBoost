import { GoalCard } from '@/components/habit-details/goal-card'
import { Separator } from '@/components/ui/separator'
import { useHabit } from '@/contexts/habit-context'
import { colors, fontFamily } from '@/styles/theme'
import {
  IconBell,
  IconCategory,
  IconCheck,
  IconPlus,
} from '@tabler/icons-react-native'
import { useLocalSearchParams } from 'expo-router'
import { router } from 'expo-router'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

export function HabitDetailsScreen() {
  const { habitId } = useLocalSearchParams()
  const { habits } = useHabit()

  const habit = habits.find((habit) => habit.id === habitId)
  return (
    <View style={styles.container}>
      {/* Header */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hábito card */}
        <View style={styles.habitCard}>
          <View style={styles.habitInfoColumn}>
            <View style={styles.iconCircle}>
              <IconCategory color={colors.zinc[900]} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.habitTitle}>Treinar</Text>
              <IconCheck color={colors.zinc[900]} />
            </View>

            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
            >
              <Text style={{ fontSize: 14, fontFamily: fontFamily.regular }}>
                dias no mês: 1,2,3,4
              </Text>
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
                  16:00
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.habitDescription}>
            Treinar 3x por semana para ganho de força e resistência, focando em
            exercícios funcionais e cardiorrespiratórios.
          </Text>
        </View>

        {/* Metas Header */}
        <View style={styles.goalsHeader}>
          <Text style={styles.goalsTitle}>Metas</Text>
          <TouchableOpacity
            style={styles.newGoalButton}
            onPress={() => {
              router.navigate({
                pathname: '/create-goal',
                params: { habitId: habitId },
              })
            }}
          >
            <Text style={styles.newGoalText}>Nova</Text>
            <IconPlus size={24} color={colors.zinc[900]} />
          </TouchableOpacity>
        </View>

        {/* Lista de metas */}
        {habit?.goals &&
          habit.goals.map((goal) => (
            <GoalCard
              key={goal.id}
              id={goal.id}
              currentCount={goal.currentCount}
              targetCount={goal.targetCount}
              title={goal.title}
            />
          ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.zinc[200],
  },
  content: {
    padding: 20,
    gap: 32,
  },
  habitCard: {
    backgroundColor: colors.zinc[50],
    borderRadius: 8,
    padding: 24,
  },
  habitInfoColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    backgroundColor: colors.lime[500],
    borderRadius: 50,
    padding: 12,
  },
  habitTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
  habitDescription: {
    color: colors.zinc[600],
    fontSize: 14,
    fontFamily: fontFamily.regular,
  },
  goalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalsTitle: {
    color: colors.zinc[900],
    fontSize: 20,
    fontFamily: fontFamily.semiBold,
  },
  newGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lime[500],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  newGoalText: {
    fontWeight: 'bold',
    color: '#000',
    marginRight: 4,
  },
})
