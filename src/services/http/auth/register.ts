import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/utils/get-axios-status-code'
import { RegisterFormDataWithoutConfirmPassword } from '@/validators/auth/register'

type RegisterResponse = {
  description: string
}

export async function register(
  data: RegisterFormDataWithoutConfirmPassword
): Promise<RegisterResponse> {
  try {
    const response = await api.post<RegisterResponse>('auth/login', data)
    console.log('Register response: ', response.data)

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
