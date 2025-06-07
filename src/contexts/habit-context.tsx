import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Habit, HabitStatus } from '@/types/habit'
import dayjs from 'dayjs'
import { createHabitOnServer } from '@/services/http/habits/create-habit'

type HabitContextData = {
  habits: Habit[]
  selectedDate: Date
  createHabit: (habit: Habit) => void
  updateHabit: (id: string, habit: Habit) => void
  deleteHabit: (id: string) => void
  completeHabit: (id: string) => void
  setSelectedDate: (date: Date) => void
}

type FilterParams = {
  habits: Habit[]
  selectedCategory: string | null
  selectedStatus: HabitStatus | null
  selectedDate: Date
}

const HabitContext = createContext<HabitContextData>({} as HabitContextData)

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())

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
      const storedHabits = await AsyncStorage.getItem('@habitsList')
      if (storedHabits) {
        setHabits(JSON.parse(storedHabits))
      }
    }

    loadHabits()
  }, [])

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

  async function completeHabit(id: string) {
    const today = dayjs().startOf('day').format('YYYY-MM-DD')

    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        const currentStatus = habit.statusByDate?.[today] ?? 'unstarted'
        const newStatus: HabitStatus =
          currentStatus === 'concluded' ? 'unstarted' : 'concluded'

        return {
          ...habit,
          statusByDate: {
            ...habit.statusByDate,
            [today]: newStatus,
          },
          updatedAt: new Date(),
        }
      }
      return habit
    })

    setHabits(updatedHabits)

    try {
      await AsyncStorage.setItem('@habitsList', JSON.stringify(updatedHabits))
    } catch (error) {
      console.log('Erro ao atualizar hábito', error)
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
