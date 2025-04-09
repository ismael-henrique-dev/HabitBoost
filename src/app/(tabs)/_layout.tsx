import React from 'react'
import { Tabs } from 'expo-router'
import {
  IconCalendar,
  IconChartBar,
  IconTrophy,
  IconUser,
} from '@tabler/icons-react-native'
import { colors, fontFamily } from '@/styles/theme'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }: { route: { name: string } }) => ({
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: fontFamily.semiBold,
          marginTop: 4,
        },
        tabBarActiveTintColor: colors.lime[500],
        tabBarInactiveTintColor: colors.zinc[900],
        tabBarStyle: {
          backgroundColor: colors.zinc[50],
          height: 82,
          paddingHorizontal: 12,
          paddingTop: 12,
          paddingVertical: 8,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
        },
        tabBarIcon: ({
          color,
          size = 24,
        }: {
          color: string
          size?: number
        }) => {
          const iconProps = { color, size }

          switch (route.name) {
            case 'index':
              return <IconCalendar {...iconProps} />
            case 'overview':
              return <IconChartBar {...iconProps} />
            case 'ranking':
              return <IconTrophy {...iconProps} />
            case 'profile':
              return <IconUser {...iconProps} />
            default:
              return null
          }
        },
      })}
    >
      <Tabs.Screen name='index' options={{ title: 'Hábitos' }} />
      <Tabs.Screen name='overview' options={{ title: 'Overview' }} />
      <Tabs.Screen name='ranking' options={{ title: 'Ranking' }} />
      <Tabs.Screen name='profile' options={{ title: 'Perfil' }} />
    </Tabs>
  )
}
