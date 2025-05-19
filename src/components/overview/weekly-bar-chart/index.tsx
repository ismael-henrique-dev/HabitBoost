import { colors } from '@/styles/theme'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native'
import { styles } from './styles'
import { useWeeklyChartData } from '@/hooks/use-weekly-chart-data'
import { useHabit } from '@/contexts/habit-context'

type DayData = {
  day: string
  value: number
  max: number
}

type WeeklyBarChartProps = {
  data: DayData[]
}

export const WeeklyBarChart: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const { habits } = useHabit()

  const maxBarHeight = 240

  

  const chartData = useWeeklyChartData(habits)

  console.log(chartData)
  console.log(habits)

  return (
    <View style={styles.container}>
      {/* Modal de informação */}
      <Modal
        animationType='fade'
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Informações do gráfico</Text>
            <Text style={styles.modalText}>
              Este gráfico representa os valores diários de uma semana. Toque em
              uma barra para ver os valores detalhados.
            </Text>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.dateText}>10 de mar - 16 de mar</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.infoIcon}>ⓘ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        {chartData.map((item, index) => {
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
    </View>
  )
}
