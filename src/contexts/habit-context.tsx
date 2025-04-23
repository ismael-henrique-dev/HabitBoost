import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Habit, HabitStatus } from '@/types/habit'

type HabitContextData = {
  habits: Habit[]
  createHabit: (habit: Habit) => void
  updateHabit: (id: string, habit: Partial<Habit>) => void
  deleteHabit: (id: string) => void
  completeHabit: (id: string) => void
}

const HabitContext = createContext<HabitContextData>({} as HabitContextData)

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([])

  async function createHabit(habit: Habit) {
    const updatedHabits = [...habits, habit]
    setHabits(updatedHabits)

    try {
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

  function updateHabit(id: string, habit: Partial<Habit>) {}

  function deleteHabit(id: string) {}

  async function completeHabit(id: string) {
    const updatedHabits = habits.map((habit) =>
      habit.id === id
        ? {
            ...habit,
            status: 'concluded' as HabitStatus,
            updatedAt: new Date(),
          }
        : habit
    )

    setHabits(updatedHabits)

    try {
      await AsyncStorage.setItem('@habitsList', JSON.stringify(updatedHabits))
    } catch (error) {
      console.log('Erro ao completar hábito', error)
    }
  }

  return (
    <HabitContext.Provider
      value={{ habits, createHabit, deleteHabit, updateHabit, completeHabit }}
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
