import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/utils/get-axios-status-code'
import { RegisterFormDataWithoutConfirmPassword } from '@/validators/auth/register'

export async function sendEmail(
  data: RegisterFormDataWithoutConfirmPassword
): Promise<void> {
  try {
    const response = await api.post<void>('user/register', data)
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
