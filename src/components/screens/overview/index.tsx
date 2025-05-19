import { OverviewCard } from '@/components/overview/overview-card'
import { WeeklyBarChart } from '@/components/overview/weekly-bar-chart'
import { useStatistics } from '@/hooks/use-statistics'
import {
  IconCalendarCheck,
  IconFlame,
  IconTargetArrow,
} from '@tabler/icons-react-native'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { styles } from './styles'

export function OverviewScreen() {
  const { totalGoals, totalGoalsCompleted, totalHabits, totalHabitsCompleted } =
    useStatistics()

  // const data = [
  //   { day: 'Dom', value: 2, max: 3 },
  //   { day: 'Seg', value: 3, max: 3 },
  //   { day: 'Ter', value: 2, max: 3 },
  //   { day: 'Qua', value: 9, max: 9 },
  //   { day: 'Qui', value: 2, max: 2 },
  //   { day: 'Sex', value: 2, max: 3 },
  //   { day: 'Sáb', value: 1, max: 3 },
  // ]

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <OverviewCard
        icon={IconFlame}
        title='Sequência atual'
        mainValue='123'
        mainLabel='dias'
        secondaryText='Melhor sequência: 200'
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
      <WeeklyBarChart />
    </ScrollView>
  )
}

