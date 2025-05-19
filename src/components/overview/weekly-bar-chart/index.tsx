import { colors, fontFamily } from '@/styles/theme'
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable
} from 'react-native'

interface DayData {
  day: string
  value: number
  max: number
}

interface WeeklyBarChartProps {
  data: DayData[]
}

export const WeeklyBarChart: React.FC<WeeklyBarChartProps> = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  const maxBarHeight = 240

  console.log(data)

  return (
    <View style={styles.container}>
      {/* Modal de informação */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Informações do gráfico</Text>
            <Text style={styles.modalText}>
              Este gráfico representa os valores diários de uma semana. Toque
              em uma barra para ver os valores detalhados.
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
        {data.map((item, index) => {
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.zinc[50],
    borderRadius: 16,
    padding: 16,
    gap: 16,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
  },
  infoIcon: {
    fontSize: 16,
    color: '#444',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    maxHeight: 320,
  },
  barWrapper: {
    alignItems: 'center',
  },
  bar: {
    width: 14,
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
  },
  dayLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  tooltip: {
    backgroundColor: colors.lime[600],
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginBottom: 4,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.zinc[50],
    padding: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    gap: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    color: '#000',
  },
  modalText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: '#333',
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 8,
    backgroundColor: colors.lime[600],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
