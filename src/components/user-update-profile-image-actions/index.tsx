import { Alert, ToastAndroid, View } from 'react-native'
import { Button } from '../ui'
import { styles } from './styles'
import { colors } from '@/styles/theme'
import * as ImagePicker from 'expo-image-picker'
import { uploadImage } from '@/services/http/user/update-user-profile-image'
import React from 'react'

type UpdateUserProfileImageActionsProps = {
  setImageUrl: (value: React.SetStateAction<string>) => void
}

export function UpdateUserProfileImageActions({
  setImageUrl,
}: UpdateUserProfileImageActionsProps) {
  async function handlePickerImage() {
    try {
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

      setImageUrl(asset.uri)
      console.log(formData)

      const response = await uploadImage(formData)

      if (!response) {
        ToastAndroid.show('Erro ao enviar imagem', ToastAndroid.LONG)
        return
      }

      ToastAndroid.show('Imagem enviada com sucesso!', ToastAndroid.SHORT)
    } catch (error) {
      console.error('Erro ao selecionar/enviar imagem:', error)
      ToastAndroid.show('Erro inesperado', ToastAndroid.LONG)
    }
  }

  return (
    <View style={styles.container}>
      <Button variant='alert'>
        <Button.Title style={{ color: colors.zinc[50] }}>
          Remover foto atual
        </Button.Title>
      </Button>
      <Button variant='secundary' onPress={handlePickerImage}>
        <Button.Title style={{ color: colors.zinc[50] }}>
          Selecionar foto da galeria
        </Button.Title>
      </Button>
      <Button>
        <Button.Title>Cancelar</Button.Title>
      </Button>
    </View>
  )
}
