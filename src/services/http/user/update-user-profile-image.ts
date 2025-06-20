import { api } from '@/services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

type UploadImageResponse = {
  Description: string
  image: {
    id: string
    url: string
    created_at: string
    updated_at: string
  }
}

export async function uploadImage(
  formData: FormData
): Promise<UploadImageResponse | null> {
  try {
    const token = await AsyncStorage.getItem('@token')

    if (!token) {
      throw new Error('Token não encontrado')
    }

    const response = await api.post<UploadImageResponse>(
      '/upload/image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (err) {
    console.error('Erro ao enviar imagem:', err)
    return null
  }
}
