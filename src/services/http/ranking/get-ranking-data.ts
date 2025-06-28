import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/utils/get-axios-status-code'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type RankingUser = {
  username: string
  imageUrl: string | null
  weektotal: number
}

export type RankingResponse = {
  Description: string
  leaderboard: RankingUser[]
}

export async function getRankingData(): Promise<RankingResponse | undefined> {
  try {
    const token = await AsyncStorage.getItem('@token')
    console.log(token)

    if (token) {
      const response = await api.get<RankingResponse>('ranking', {
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
