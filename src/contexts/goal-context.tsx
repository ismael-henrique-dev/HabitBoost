import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Goal } from '@/types/goal'
import { getGoals } from '@/services/http/goals/get-goals'
import { useAuth } from './auth-context'
import { updateGoalOnServer } from '@/services/http/goals/update-goal'

type GoalContextData = {
  goals: Goal[]
  createGoal: (goal: Goal) => void
  updateGoal: (id: string, updatedGoal: Goal) => void
  deleteGoal: (id: string) => void
  completeGoal: (id: string) => void
}

const GoalContext = createContext<GoalContextData>({} as GoalContextData)

export function GoalProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([])
  const { isLogged } = useAuth()

  useEffect(() => {
    async function loadGoals() {
      try {
        if (isLogged) {
          // 🔐 Se logado: buscar da API
          const response = await getGoals()
          const allGoals = response.Goals

          setGoals(allGoals)
          await AsyncStorage.setItem('@goalList', JSON.stringify(allGoals))
        } else {
          // 📦 Se não logado: pegar do AsyncStorage
          const storedGoals = await AsyncStorage.getItem('@goalList')
          if (storedGoals) {
            setGoals(JSON.parse(storedGoals))
          }
        }
      } catch (error) {
        console.error('Erro ao carregar metas:', error)
      }
    }

    loadGoals()
  }, [isLogged])

  async function saveGoals(updatedGoals: Goal[]) {
    setGoals(updatedGoals)
    await AsyncStorage.setItem('@goalList', JSON.stringify(updatedGoals))
  }

  function createGoal(goal: Goal) {
    const updatedGoals = [...goals, goal]
    saveGoals(updatedGoals)
  }

  function updateGoal(id: string, updatedGoal: Goal) {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? updatedGoal : goal
    )
    saveGoals(updatedGoals)
  }

  function deleteGoal(id: string) {
    const updatedGoals = goals.filter((goal) => goal.id !== id)
    saveGoals(updatedGoals)
  }

  async function completeGoal(id: string) {
    const goal = goals.find((goal) => goal.id === id)
    if (!goal) return

    const updatedGoal: Goal = {
      ...goal,
      currentCount: goal.currentCount + 1,
      updatedAt: new Date(),
    }

    if (isLogged) {
      await updateGoalOnServer(id, updatedGoal)
    }

    const updatedGoals = goals.map((goal) =>
      goal.id === id ? updatedGoal : goal
    )

    saveGoals(updatedGoals)
    updateGoal(id, updatedGoal)
  }

  return (
    <GoalContext.Provider
      value={{ goals, createGoal, updateGoal, deleteGoal, completeGoal }}
    >
      {children}
    </GoalContext.Provider>
  )
}

export function useGoal() {
  const context = useContext(GoalContext)
  if (!context) {
    throw new Error('useGoal must be used within a GoalProvider')
  }
  return context
}
