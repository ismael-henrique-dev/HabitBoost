import { useHabit } from '@/contexts/habit-context'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View, ScrollView } from 'react-native'
import { styles } from './styles'
import { HabitDetailsCard } from '@/components/habit-details/habit-details-card'
import { Habit } from '@/types/habit'
import { GoalsList } from '@/components/habit-details/goals-list'
import { GoalsHeader } from '@/components/habit-details/goals-header'

export function HabitDetailsScreen() {
  const { habitId, selectedDate } = useLocalSearchParams()
  const { habits } = useHabit()

  const habit = habits.find((habit) => habit.id === habitId)
  return (
    <View style={styles.container}>
      {/* Header */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hábito card */}
        <HabitDetailsCard
          habit={habit as Habit}
          selectedDate={selectedDate as string}
        />

        {/* Metas Header */}
        <GoalsHeader habitId={habitId as string} />

        {/* Lista de metas */}
        <GoalsList habit={habit as Habit} />
      </ScrollView>
    </View>
  )
}
