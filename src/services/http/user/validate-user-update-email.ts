import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/utils/get-axios-status-code'
import AsyncStorage from '@react-native-async-storage/async-storage'

type ValidateUserUpdateEmailResponse = {
  token: string
}

export async function ValidateUserUpdateEmail(
  validateToken: string
): Promise<ValidateUserUpdateEmailResponse> {
  try {
    const token = await AsyncStorage.getItem('@token')
    if (token) {
      const response = await api.patch<ValidateUserUpdateEmailResponse>(
        'update/email/validate',
        {
          token: validateToken,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log("Validate email response: ", response.data)
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
