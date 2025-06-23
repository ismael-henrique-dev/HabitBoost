import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/utils/get-axios-status-code'

type ValidateUserUpdateEmailResponse = {
  token: string
}

export async function ValidateUserUpdateEmail(
  token: string
): Promise<ValidateUserUpdateEmailResponse> {
  try {
    if (token) {
      const response = await api.patch<ValidateUserUpdateEmailResponse>(
        'update/email/validate',
        {
          token,
        }
      )
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
