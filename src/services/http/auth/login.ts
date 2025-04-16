import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/utils/get-axios-status-code'
import { LoginFormData } from '@/validators/auth/login'

type LoginResponse = {
  token: string
}

export async function login(data: LoginFormData): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('auth/login', data)
    console.log('Login response: ', response.data)

    return response.data
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
