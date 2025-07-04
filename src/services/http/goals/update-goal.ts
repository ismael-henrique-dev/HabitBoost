import { api } from '@/services/api'
import { Goal } from '@/types/goal'
import { getAxiosStatusCode } from '@/utils/get-axios-status-code'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function updateGoalOnServer(goalId: string, data: Goal) {
  try {
    const token = await AsyncStorage.getItem('@token')
    if (token) {
      const response = await api.patch(`update/goal/${goalId}`, data, {
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
      case 409:
        throw new Error('Este nome ou email já está em uso.')
      case 500:
        throw new Error('Erro interno no servidor.')
      default:
        throw new Error('Erro desconhecido.')
    }
  }
}
