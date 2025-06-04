import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/utils/get-axios-status-code'

type SendCodeResponse = {
  token: string
}

export async function sendCode(code: string): Promise<SendCodeResponse> {
  try {
    console.log(code)
    const response = await api.patch<SendCodeResponse>(
      'user/recover/validate',
      {
        code: code,
      },
      { withCredentials: true}
    )
    console.log('token: ', response.data)

    return response.data
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
