import { Controller, useForm } from 'react-hook-form'
import { Text, ToastAndroid, View } from 'react-native'
import { router } from 'expo-router'
import { colors } from '@/styles/theme'
import { Input } from '../../input'
import { Button } from '../../button'
import { ErrorMenssage } from '../../error-menssage'
import { IconLock, IconMail } from '@tabler/icons-react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { ModalSeparator } from '../../separator'
import { styles } from './styles'
import {
  updateUserEmailFormSchema,
  UpdateUserEmailFormSchema,
} from '@/validators/user/update-email'
import { updateUserEmail } from '@/services/http/user/update-user-email'
import { useState } from 'react'
import { getErrorMessage } from '@/utils/get-error-menssage'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function UpdateUserEmailForm() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UpdateUserEmailFormSchema>({
    resolver: zodResolver(updateUserEmailFormSchema),
    defaultValues: {
      newEmail: '',
      oldEmail: '',
      password: '',
    },
    mode: 'onChange',
  })

  const handleUpdateUserEmail = async (data: UpdateUserEmailFormSchema) => {
    try {
      setIsLoading(true)
      await updateUserEmail(data)
      await AsyncStorage.setItem('@updatedEmail', data.newEmail)

      ToastAndroid.show('Email enviado!', ToastAndroid.SHORT)
    } catch (responseError) {
      const error = getErrorMessage(responseError)
      ToastAndroid.show(error, ToastAndroid.SHORT)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.formContainer}>
      {/* Email atual */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email atual:</Text>
        <Controller
          control={control}
          name='oldEmail'
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder='Digite seu email atual'
              value={value}
              onChangeText={onChange}
            >
              <Input.Icon icon={IconMail} />
            </Input>
          )}
        />
        {errors.oldEmail && (
          <ErrorMenssage>{errors.oldEmail.message}</ErrorMenssage>
        )}
      </View>

      {/* Senha atual */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Senha atual:</Text>
        <Controller
          control={control}
          name='password'
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder='Digite sua senha'
              value={value}
              onChangeText={onChange}
              variant='password'
            >
              <Input.Icon icon={IconLock} />
            </Input>
          )}
        />
        {errors.password && (
          <ErrorMenssage>{errors.password.message}</ErrorMenssage>
        )}
      </View>

      <ModalSeparator />

      {/* Novo email */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Novo email: </Text>
        <Controller
          control={control}
          name='newEmail'
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder='Digite seu novo email'
              value={value}
              onChangeText={onChange}
            >
              <Input.Icon icon={IconMail} />
            </Input>
          )}
        />
        {errors.newEmail && (
          <ErrorMenssage>{errors.newEmail.message}</ErrorMenssage>
        )}
      </View>

      {/* Botões */}
      <Button
        variant='secundary'
        onPress={handleSubmit(handleUpdateUserEmail)}
        disabled={isLoading}
        isLoading={isLoading}
      >
        <Button.Title style={{ color: colors.zinc[50] }}>Concluir</Button.Title>
      </Button>

      <Button onPress={() => router.back()} disabled={isLoading}>
        <Button.Title>Cancelar</Button.Title>
      </Button>
    </View>
  )
}
