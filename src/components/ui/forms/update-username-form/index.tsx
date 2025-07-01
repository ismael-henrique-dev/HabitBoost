import { Controller, useForm } from 'react-hook-form'
import { Text, ToastAndroid, View } from 'react-native'
import { router } from 'expo-router'
import { colors } from '@/styles/theme'
import { Input } from '../../input'
import { Button } from '../../button'
import { ErrorMenssage } from '../../error-menssage'
import { styles } from './styles'
import { IconUser } from '@tabler/icons-react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  UpdateUsernameFormSchema,
  updateUsernameFormSchema,
} from '@/validators/user/update-username'
import { ModalSeparator } from '../../separator'
import { updateUsername } from '@/services/http/user/update-username'
import { useState } from 'react'
import { getErrorMessage } from '@/utils/get-error-menssage'
import { useUser } from '@/contexts/user-context'

export function UpdateUsernameForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { userData, setUserData } = useUser()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUsernameFormSchema>({
    resolver: zodResolver(updateUsernameFormSchema),
    defaultValues: {
      newUsername: '',
      oldUsername: '',
    },
  })

  const handleUpdateUsername = async (data: UpdateUsernameFormSchema) => {
    try {
      setIsLoading(true)

      await updateUsername(data)
      if (userData) {
        setUserData({
          ...userData,
          data: {
            ...userData.data,
            username: data.newUsername,
          },
        })
      }

      ToastAndroid.show(
        'Nome de usuário atualizado com sucesso!',
        ToastAndroid.SHORT
      )
    } catch (responseError) {
      const error = getErrorMessage(responseError)
      ToastAndroid.show(error, ToastAndroid.SHORT)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.formContainer}>
      {/* Título da meta */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome de usuário atual:</Text>
        <Controller
          control={control}
          name='oldUsername'
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder='Digite seu nome de usuário'
              value={value}
              onChangeText={onChange}
            >
              <Input.Icon icon={IconUser} />
            </Input>
          )}
        />
        {errors.oldUsername && (
          <ErrorMenssage>{errors.oldUsername.message}</ErrorMenssage>
        )}
      </View>
      <ModalSeparator />

      {/* Quantidade atual */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Novo nome de usuário: </Text>
        <Controller
          control={control}
          name='newUsername'
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder='Digite seu novo nome de usuário'
              value={value}
              onChangeText={onChange}
            >
              <Input.Icon icon={IconUser} />
            </Input>
          )}
        />
        {errors.newUsername && (
          <ErrorMenssage>{errors.newUsername.message}</ErrorMenssage>
        )}
      </View>

      {/* Botões */}
      <Button
        isLoading={isLoading}
        disabled={isLoading}
        variant='secundary'
        onPress={handleSubmit(handleUpdateUsername)}
      >
        <Button.Title style={{ color: colors.zinc[50] }}>Concluir</Button.Title>
      </Button>

      <Button onPress={() => router.back()} disabled={isLoading}>
        <Button.Title>Cancelar</Button.Title>
      </Button>
    </View>
  )
}
