import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Habit, HabitStatus } from '@/types/habit'
import dayjs from 'dayjs'
import { completeHabitOnServer } from '@/services/http/habits/complete-habit'
import { useAuth } from './auth-context'
import { getHabits } from '@/services/http/habits/get-habits'
import { getErrorMessage } from '@/utils/get-error-menssage'

type HabitContextData = {
  habits: Habit[]
  selectedDate: Date
  createHabit: (habit: Habit) => void
  updateHabit: (id: string, habit: Habit) => void
  deleteHabit: (id: string) => void
  completeHabit: (id: string, selectedDate: string) => void
  setSelectedDate: (date: Date) => void
}

const HabitContext = createContext<HabitContextData>({} as HabitContextData)

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { isLogged } = useAuth()

  async function createHabit(habit: Habit) {
    try {
      const updatedHabits = [...habits, habit]
      setHabits(updatedHabits)

      await AsyncStorage.setItem('@habitsList', JSON.stringify(updatedHabits))
    } catch (error) {
      console.log('Erro ao criar hábito', error)
    }
  }

  useEffect(() => {
    async function loadHabits() {
      const today = dayjs().startOf('day')

      try {
        let habitsArray: Habit[] = []

        if (isLogged) {
          const response = await getHabits()
          habitsArray = response.habits
          await AsyncStorage.setItem('@habitsList', JSON.stringify(habitsArray))
        } else {
          const storedHabits = await AsyncStorage.getItem('@habitsList')
          if (storedHabits) {
            habitsArray = JSON.parse(storedHabits)
          }
        }

        const updatedHabits = habitsArray.map((habit) => {
          const statusByDate = { ...habit.statusByDate }
          Object.keys(statusByDate || {}).forEach((date) => {
            if (
              dayjs(date).isBefore(today) &&
              statusByDate[date] === 'unstarted'
            ) {
              statusByDate[date] = 'missed'
            }
          })
          return { ...habit, statusByDate }
        })

        setHabits(updatedHabits)
        await AsyncStorage.setItem('@habitsList', JSON.stringify(updatedHabits))
      } catch (responseError) {
        const error = getErrorMessage(responseError)
        console.log(error)
      }
    }

    loadHabits()
  }, [isLogged])

  async function updateHabit(id: string, habit: Habit) {
    const updatedHabits = habits.map((beforeHabit) => {
      if (beforeHabit.id === id) {
        return habit
      }
      return beforeHabit
    })

    setHabits(updatedHabits)

    try {
      await AsyncStorage.setItem('@habitsList', JSON.stringify(updatedHabits))
    } catch (error) {
      console.log('Erro ao atualizar hábito', error)
    }
  }

  async function deleteHabit(id: string) {
    const updatedHabits = habits.filter((habit) => habit.id !== id)
    setHabits(updatedHabits)
    await AsyncStorage.setItem('@habitsList', JSON.stringify(updatedHabits))
  }

  async function completeHabit(id: string, selectedDate: string) {
    const date = dayjs(selectedDate).startOf('day').format('YYYY-MM-DD')

    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        let newStatus: HabitStatus
        const currentStatus = habit.statusByDate?.[date]
        const today = dayjs().startOf('day')
        const isPast = dayjs(date).isBefore(today)

        if (currentStatus === 'concluded' && isPast) {
          newStatus = 'missed'
        } else if (
          currentStatus === 'unstarted' ||
          currentStatus === 'missed'
        ) {
          newStatus = 'concluded'
        } else if(currentStatus === "concluded") {
          newStatus = "unstarted"
        } else {
          newStatus = currentStatus
        }

        const updatedHabit = {
          ...habit,
          statusByDate: {
            ...habit.statusByDate,
            [date]: newStatus,
          },
          updatedAt: new Date(),
        }

        if (isLogged) {
          completeHabitOnServer(habit.id, {
            date: selectedDate,
            status: updatedHabit.statusByDate[selectedDate],
          })
        }

        return updatedHabit
      }
      return habit
    })

    setHabits(updatedHabits)

    try {
      await AsyncStorage.setItem('@habitsList', JSON.stringify(updatedHabits))
    } catch (error) {
      console.log('Erro ao atualizar hábito localmente:', error)
    }
  }

  return (
    <HabitContext.Provider
      value={{
        habits,
        selectedDate,
        createHabit,
        deleteHabit,
        updateHabit,
        completeHabit,
        setSelectedDate,
      }}
    >
      {children}
    </HabitContext.Provider>
  )
}

export function useHabit() {
  const context = HabitContext
  if (!context) {
    throw new Error('useHabit must be used within a HabitProvider')
  }
  return useContext(context)
}
