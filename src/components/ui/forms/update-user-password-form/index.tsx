import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { router } from 'expo-router'
import { colors } from '@/styles/theme'
import { Input } from '../../input'
import { Button } from '../../button'
import { ErrorMenssage } from '../../error-menssage'
import { IconUser } from '@tabler/icons-react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { ModalSeparator } from '../../separator'

import { styles } from './styles'
import {
  updateUserPasswordFormSchema,
  UpdateUserPasswordFormSchema,
} from '@/validators/user/update-password'
import { updateUserPassword } from '@/services/http/user/update-user-password'

export function UpdateUserPasswordForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserPasswordFormSchema>({
    resolver: zodResolver(updateUserPasswordFormSchema),
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
      oldPassword: '',
    },
  })

  const handleUpdateUserEmail = async (data: UpdateUserPasswordFormSchema) => {
    try {
      const response = await updateUserPassword(data)
    } catch {}
  }

  return (
    <View style={styles.formContainer}>
      {/* Título da meta */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Senha atual:</Text>
        <Controller
          control={control}
          name='oldPassword'
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
        {errors.oldPassword && (
          <ErrorMenssage>{errors.oldPassword.message}</ErrorMenssage>
        )}
      </View>

      <ModalSeparator />
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nova senha:</Text>
        <Controller
          control={control}
          name='newPassword'
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
        {errors.newPassword && (
          <ErrorMenssage>{errors.newPassword.message}</ErrorMenssage>
        )}
      </View>

      {/* Quantidade atual */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Confirmar sua nova senha:</Text>
        <Controller
          control={control}
          name='confirmPassword'
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
        {errors.confirmPassword && (
          <ErrorMenssage>{errors.confirmPassword.message}</ErrorMenssage>
        )}
      </View>

      {/* Botões */}
      <Button variant='secundary' onPress={handleSubmit(handleUpdateUserEmail)}>
        <Button.Title style={{ color: colors.zinc[50] }}>Concluir</Button.Title>
      </Button>

      <Button onPress={() => router.back()}>
        <Button.Title>Cancelar</Button.Title>
      </Button>
    </View>
  )
}
