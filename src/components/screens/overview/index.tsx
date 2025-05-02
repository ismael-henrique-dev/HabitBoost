import { OverviewCard } from '@/components/overview/overview-card'
import { colors } from '@/styles/theme'
import {
  IconCalendarCheck,
  IconFlame,
  IconTargetArrow,
} from '@tabler/icons-react-native'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

export const OverviewScreen = () => {
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
        mainValue='19'
        mainLabel='hábitos'
        secondaryText='Total: 20'
      />
      <OverviewCard
        icon={IconTargetArrow}
        title='Metas concluídas'
        mainValue='12'
        mainLabel='metas'
        secondaryText='Total: 24'
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: colors.zinc[200],
    gap: 24,
  },
})
