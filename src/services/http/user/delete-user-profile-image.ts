import { api } from '@/services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function deleteImage() {
  try {
    const token = await AsyncStorage.getItem('@token')

    if (!token) {
      throw new Error('Token não encontrado')
    }

    const response = await api.delete('/delete/image', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (err) {
    console.error('Erro ao enviar imagem:', err)
    return null
  }
}
