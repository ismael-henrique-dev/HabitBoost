import { Alert, ToastAndroid, View } from 'react-native'
import { Button } from '../ui'
import { colors } from '@/styles/theme'
import * as ImagePicker from 'expo-image-picker'
import { uploadImage } from '@/services/http/user/update-user-profile-image'
import React, { useState } from 'react'
import { useUser } from '@/contexts/user-context'
import { deleteImage } from '@/services/http/user/delete-user-profile-image'

export function UpdateUserProfileImageActions() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingRemoveImage, setIsLoadingRemoveImage] = useState(false)
  const { userData, setUserData } = useUser()

  async function handlePickerImage() {
    try {
      setIsLoading(true)

      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (!granted) {
        Alert.alert(
          'Permissão necessária',
          'Permita que sua aplicação acesse as imagens'
        )
        return
      }

      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ['images'],
        base64: false,
        aspect: [4, 4],
        quality: 1,
      })

      if (canceled || !assets || assets.length === 0) {
        ToastAndroid.show('Operação cancelada', ToastAndroid.SHORT)
        return
      }

      const asset = assets[0]
      const filename = asset.uri.substring(asset.uri.lastIndexOf('/') + 1)
      const extension = filename.split('.').pop()
      const formData = new FormData()

      formData.append('file', {
        name: filename,
        uri: asset.uri,
        type: `image/${extension}`,
      } as any)

      if (userData) {
        setUserData({
          ...userData,
          data: {
            ...userData.data,
            imageUrl: asset.uri,
          },
        })
      }
      console.log(asset.uri)

      const response = await uploadImage(formData)

      if (!response) {
        ToastAndroid.show('Erro ao enviar imagem', ToastAndroid.LONG)
        return
      }

      ToastAndroid.show('Imagem enviada com sucesso!', ToastAndroid.SHORT)
    } catch (error) {
      console.error('Erro ao selecionar/enviar imagem:', error)
      ToastAndroid.show('Erro inesperado', ToastAndroid.LONG)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDeleteProfileImage() {
    try {
      setIsLoadingRemoveImage(true)

      await deleteImage()

      if (userData) {
        setUserData({
          ...userData,
          data: {
            ...userData.data,
            imageUrl: null,
          },
        })
      }

      ToastAndroid.show('Imagem deletada com sucesso!', ToastAndroid.SHORT)
    } catch (error) {
      console.error('Erro ao deletar a imagem:', error)
      ToastAndroid.show('Erro inesperado', ToastAndroid.LONG)
    } finally {
      setIsLoadingRemoveImage(false)
    }
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Button
        isLoading={isLoadingRemoveImage}
        disabled={isLoadingRemoveImage}
        onPress={handleDeleteProfileImage}
        variant='alert'
        style={{ width: '100%' }}
      >
        <Button.Title style={{ color: colors.zinc[50] }}>
          {isLoading ? 'Removendo imagem...' : 'Remover foto atual'}
        </Button.Title>
      </Button>

      <Button
        isLoading={isLoading}
        disabled={isLoading}
        variant='secundary'
        onPress={handlePickerImage}
        style={{ width: '100%' }}
      >
        <Button.Title style={{ color: colors.zinc[50] }}>
          {isLoading ? 'Fazendo upload...' : 'Selecionar foto da galeria'}
        </Button.Title>
      </Button>

      <Button
        disabled={isLoading || isLoadingRemoveImage}
        variant='default'
        style={{ width: '100%' }}
      >
        <Button.Title>Cancelar</Button.Title>
      </Button>
    </View>
  )
}
