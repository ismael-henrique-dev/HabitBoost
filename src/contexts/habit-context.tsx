import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Habit, HabitStatus } from '@/types/habit'
import { Goal } from '@/types/goal'

type HabitContextData = {
  habits: Habit[]
  selectedDate: Date
  createHabit: (habit: Habit) => void
  updateHabit: (id: string, habit: Habit) => void
  deleteHabit: (id: string) => void
  completeHabit: (id: string) => void
  setSelectedDate: (date: Date) => void
  addGoalToHabit: (habitId: string, goal: Goal) => void
  updateGoalInHabit: (
    habitId: string,
    goalId: string,
    updatedGoal: Goal
  ) => void
  deleteGoalFromHabit: (habitId: string, goalId: string) => void
}

const HabitContext = createContext<HabitContextData>({} as HabitContextData)

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())

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

  // arrumar essa função
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
    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        const isCompleted = habit.status === 'concluded'

        return {
          ...habit,
          status: isCompleted
            ? ('unstarted' as HabitStatus)
            : ('concluded' as HabitStatus),
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

  function addGoalToHabit(habitId: string, goal: Goal) {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        return {
          ...habit,
          goals: [...(habit.goals || []), goal],
          updatedAt: new Date(),
        }
      }
      return habit
    })

    setHabits(updatedHabits)
    AsyncStorage.setItem('@habitsList', JSON.stringify(updatedHabits))
  }

  function updateGoalInHabit(
    habitId: string,
    goalId: string,
    updatedGoal: Goal
  ) {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        const newGoals =
          habit.goals?.map((goal) =>
            goal.id === goalId ? updatedGoal : goal
          ) || []

        return {
          ...habit,
          goals: newGoals,
          updatedAt: new Date(),
        }
      }
      return habit
    })

    setHabits(updatedHabits)
    AsyncStorage.setItem('@habitsList', JSON.stringify(updatedHabits))
  }

  function deleteGoalFromHabit(habitId: string, goalId: string) {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        const filteredGoals =
          habit.goals?.filter((goal) => goal.id !== goalId) || []

        return {
          ...habit,
          goals: filteredGoals,
          updatedAt: new Date(),
        }
      }
      return habit
    })

    setHabits(updatedHabits)
    AsyncStorage.setItem('@habitsList', JSON.stringify(updatedHabits))
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
        addGoalToHabit,
        updateGoalInHabit,
        deleteGoalFromHabit,
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
