import { OverviewCard } from '@/components/overview/overview-card'
import { WeeklyBarChart } from '@/components/overview/weekly-bar-chart'
import { useStatistics } from '@/hooks/use-statistics'
import {
  IconCalendarCheck,
  IconFlame,
  IconTargetArrow,
} from '@tabler/icons-react-native'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { styles } from './styles'
import { GoalSummaryCard } from '@/components/overview/goals-summary-card'
import { router } from 'expo-router'

export function OverviewScreen() {
  const {
    totalGoals,
    totalGoalsCompleted,
    totalHabits,
    totalHabitsCompleted,
    currentSequence,
    bestSequence,
  } = useStatistics()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <OverviewCard
        icon={IconFlame}
        title='Sequência atual'
        mainValue={String(currentSequence)}
        mainLabel='dias'
        secondaryText={`Melhor sequência: ${bestSequence}`}
      />
      <OverviewCard
        icon={IconCalendarCheck}
        title='Hábitos concluídos'
        mainValue={String(totalHabitsCompleted)}
        mainLabel='hábitos'
        secondaryText={`Total: ${totalHabits}`}
      />
      <OverviewCard
        icon={IconTargetArrow}
        title='Metas concluídas'
        mainValue={String(totalGoalsCompleted)}
        mainLabel='metas'
        secondaryText={`Total: ${totalGoals}`}
      />
      <View style={styles.infoGroup}>
        <Text style={styles.title}>Resumo dos hábitos</Text>
        <Text
          onPress={() => router.navigate('/habit-history')}
          style={styles.link}
        >
          VER MAIS
        </Text>
      </View>
      <WeeklyBarChart />
      <View style={styles.infoGroup}>
        <Text style={styles.title}>Resumo das metas</Text>
      </View>
      <GoalSummaryCard />
    </ScrollView>
  )
}
