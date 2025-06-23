import { api } from '@/services/api'
import { Habit } from '@/types/habit'
import { getAxiosStatusCode } from '@/utils/get-axios-status-code'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function updateHabitOnServer(habitId: string, data: Habit) {
  try {
    const token = await AsyncStorage.getItem('@token')
    if (token) {
      const response = await api.put(`update/habit/${habitId}`, data, {
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
      case 404:
        throw new Error('Categoria do hábito não encontrada.')
      case 500:
        throw new Error('Erro interno no servidor.')
      default:
        throw new Error('Erro desconhecido.')
    }
  }
}
