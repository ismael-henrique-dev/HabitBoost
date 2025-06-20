import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/utils/get-axios-status-code'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type GetProfileResponse = {
  data: { username: string; email: string; imageUrl: string }
  Description: string
}

export async function getProfile(): Promise<GetProfileResponse | undefined> {
  try {
    const token = await AsyncStorage.getItem('@token') 

    if (token) {
      const response = await api.get<GetProfileResponse>('user/get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    }
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)

    switch (statusCode) {
      case 400:
        throw new Error('Senha inválida.')
      case 404:
        throw new Error('Usuário não encontrado.')
      case 500:
        throw new Error('Erro interno no servidor.')
      default:
        throw new Error('Erro desconhecido.')
    }
  }
}
