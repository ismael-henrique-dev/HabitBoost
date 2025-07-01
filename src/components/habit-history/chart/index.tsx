import { colors } from '@/styles/theme'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native'

import { useWeeklyChartData } from '@/hooks/use-weekly-chart-data'
import { useHabit } from '@/contexts/habit-context'

import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import { WeekSummary } from '@/hooks/group-habits-by-week'
import { styles } from './styles'

type Props = {
  week: WeekSummary
}

export function WeeklyBarChartInline({ week }: Props) {
  const maxBarHeight = 150
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <View style={styles.weekContainer}>
      <View style={styles.weekHeader}>
        <Text style={styles.weekLabel}>{week.label}</Text>
  
      </View>

      <View style={styles.chartContainer}>
        {week.days.map((item, index) => {
          const percentage = item.max === 0 ? 0 : item.value / item.max
          const barHeight = maxBarHeight * percentage
          const isSelected = selectedIndex === index

          return (
            <View key={index} style={styles.barWrapper}>
              {isSelected && (
                <View style={styles.tooltip}>
                  <Text style={styles.tooltipText}>
                    {item.value}/{item.max}
                  </Text>
                </View>
              )}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  setSelectedIndex(index === selectedIndex ? null : index)
                }
              >
                <View
                  style={[
                    styles.bar,
                    {
                      height: barHeight,
                      backgroundColor: isSelected
                        ? colors.lime[600]
                        : colors.lime[500],
                    },
                  ]}
                />
              </TouchableOpacity>

              <Text style={styles.dayLabel}>{item.day}</Text>
            </View>
          )
        })}
      </View>
    // </View>
  )
}
