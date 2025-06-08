import { api } from '@/services/api'
import { Category } from '@/types/category'
import { getAxiosStatusCode } from '@/utils/get-axios-status-code'
import AsyncStorage from '@react-native-async-storage/async-storage'

type GetCategoriesResponse = {
  Description: string
  categories: Category[]
}

export async function getCategories(): Promise<GetCategoriesResponse> {
  const token = await AsyncStorage.getItem('@token')

  if (!token) {
    throw new Error('Token não encontrado. Faça login novamente.')
  }

  try {
    const response = await api.get<GetCategoriesResponse>(
      '/profile/get/categories',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)

    switch (statusCode) {
      case 400:
        throw new Error('Requisição inválida.')
      case 401:
        throw new Error('Não autorizado. Verifique seu login.')
      case 404:
        throw new Error('Hábitos não encontrados.')
      case 500:
        throw new Error('Erro interno no servidor.')
      default:
        throw new Error('Erro desconhecido ao buscar hábitos.')
    }
  }
}
