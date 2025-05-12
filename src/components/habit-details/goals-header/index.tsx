import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { IconPlus } from '@tabler/icons-react-native'
import { router } from 'expo-router'
import { colors } from '@/styles/theme'
import { styles } from './styles'

type GoalsHeaderProps = {
  habitId: string
}

export function GoalsHeader({ habitId }: GoalsHeaderProps) {
  return (
    <View style={styles.goalsHeader}>
      <Text style={styles.goalsTitle}>Metas</Text>
      <TouchableOpacity
        style={styles.newGoalButton}
        onPress={() => {
          router.navigate({
            pathname: '/create-goal',
            params: { habitId },
          })
        }}
      >
        <Text style={styles.newGoalText}>Nova</Text>
        <IconPlus size={24} color={colors.zinc[900]} />
      </TouchableOpacity>
    </View>
  )
}
