import { useState } from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import {
  IconChevronLeft,
  IconChevronRight,
  IconX,
} from '@tabler/icons-react-native'
import {
  Calendar as CalendarComponent,
  DateData,
  LocaleConfig,
} from 'react-native-calendars'
import { styles } from './styles'
import { DayState } from 'react-native-calendars/src/types'
import { ptBR } from '@/utils/locale-calendar-config'
import { Button } from '../button'
import { colors } from '@/styles/theme'
import dayjs from 'dayjs'

LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br'

type CalendarProps = {
  selectedDates: { [date: string]: { selected: boolean } }
  onSelectDate: (dates: { [date: string]: { selected: boolean } }) => void
}

export function Calendar({ selectedDates = {}, onSelectDate }: CalendarProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function toggleDate(date: DateData) {
    const today = dayjs().startOf('day')
    const selected = dayjs(date.dateString).startOf('day')

    if (selected.isBefore(today)) return

    const updatedDates = { ...selectedDates }
    if (updatedDates[date.dateString]) {
      delete updatedDates[date.dateString]
    } else {
      updatedDates[date.dateString] = { selected: true }
    }
    onSelectDate(updatedDates)
  }

  return (
    <View>
      {/* Trigger */}
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.triggerText}>
          {Object.keys(selectedDates).length > 0
            ? Object.keys(selectedDates).join(', ')
            : 'Nenhuma'}
        </Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Escolha os dias</Text>
              <IconX onPress={() => setIsModalVisible(false)} />
            </View>
            <CalendarComponent
              style={styles.calendar}
              renderArrow={(direction: 'right' | 'left') =>
                direction === 'right' ? (
                  <IconChevronRight />
                ) : (
                  <IconChevronLeft />
                )
              }
              headerStyle={{
                borderBottomWidth: 0.5,
                borderBottomColor: colors.zinc[200],
                paddingBottom: 10,
                marginBottom: 10,
              }}
              theme={{
                width: '100%',
                textMonthFontFamily: 'Rubik_500Medium',
                textMonthFontSize: 18,
                monthTextColor: colors.zinc[900],
                todayTextColor: colors.lime[500],

                calendarBackground: 'transparent',
                textDayStyle: { color: colors.zinc[900] },
                textDisabledColor: colors.zinc[200],
                arrowStyle: {
                  margin: 0,
                  padding: 0,
                },
              }}
              minDate={new Date().toDateString()}
              hideExtraDays
              markedDates={selectedDates}
              dayComponent={({
                date,
                state,
              }: {
                date: DateData
                state: DayState
              }) => {
                const isSelected = !!selectedDates[date.dateString]
                return (
                  <TouchableOpacity
                    style={[styles.day, isSelected && styles.daySelected]}
                    onPress={() => toggleDate(date)}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        (state === 'inactive' || state === 'disabled') &&
                          styles.disabled,
                        state === 'today' && styles.today,
                        isSelected && styles.dayText,
                      ]}
                    >
                      {date.day}
                    </Text>
                  </TouchableOpacity>
                )
              }}
            />
            <Button
              style={{ width: '100%' }}
              variant='secundary'
              onPress={() => setIsModalVisible(false)}
            >
              <Button.Title style={{ color: colors.zinc[50] }}>
                Concluir
              </Button.Title>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  )
}
