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

import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { IconInfoCircle, IconX } from '@tabler/icons-react-native'
dayjs.locale('pt-br')

const today = dayjs()
const weekStart = today.startOf('week') // domingo
const weekEnd = today.endOf('week') // sábado

const formattedRange = `${weekStart.format('D [de] MMM')} - ${weekEnd.format(
  'D [de] MMM'
)}`

export const WeeklyBarChart: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const { habits } = useHabit()

  const maxBarHeight = 240

  const { habitChartData } = useWeeklyChartData(habits)

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
          <ModalContent setModalVisible={() => setModalVisible(false)} />
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.dateText}>{formattedRange}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <IconInfoCircle color={colors.zinc[600]} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        {habitChartData.map((item, index) => {
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

type ModalContentProps = {
  setModalVisible: (value: React.SetStateAction<boolean>) => void
}

function ModalContent({ setModalVisible }: ModalContentProps) {
  return (
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Como este gráfico funciona?</Text>{' '}
        <IconX
          color={colors.zinc[900]}
          size={24}
          onPress={() => setModalVisible(false)}
        />
      </View>
      <Text style={styles.modalText}>
        Este gráfico exibe o seu progresso diário, mostrando a relação entre os
        hábitos ou metas concluídas e o total planejado para cada dia.
      </Text>
      <Text style={styles.modalText}>
        Exemplo: se, na terça-feira, você tinha 4 hábitos para concluir e
        completou 2, ao clicar na barra desse dia, verá a informação "2/4",
        indicando que 2 dos 4 hábitos foram concluídos.
      </Text>
    </View>
  )
}
