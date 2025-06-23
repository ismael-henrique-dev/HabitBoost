import { api } from '@/services/api'
import { HabitStatus } from '@/types/habit'
import { getAxiosStatusCode } from '@/utils/get-axios-status-code'
import AsyncStorage from '@react-native-async-storage/async-storage'

type CompleteHabitData = {
  date: string
  status: HabitStatus
}

export async function completeHabitOnServer(habitId: string, data: CompleteHabitData) {
  try {
    const token = await AsyncStorage.getItem('@token')
    if (token) {
      const response = await api.patch<CompleteHabitData>(`update/habit/status/${habitId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('Create habit response: ', response.data)

      return response.data
    } else {
      throw new Error('Token não encontrado.')
    }
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)

    switch (statusCode) {
      case 500:
        throw new Error('Erro interno no servidor.')
      default:
        throw new Error('Erro desconhecido.')
    }
  }
}
