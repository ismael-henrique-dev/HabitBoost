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
  updateUserEmailFormSchema,
  UpdateUserEmailFormSchema,
} from '@/validators/user/update-email'
import { updateUserEmail } from '@/services/http/user/update-user-email'

export function UpdateUserEmailForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserEmailFormSchema>({
    resolver: zodResolver(updateUserEmailFormSchema),
    defaultValues: {
      newEmail: '',
      oldEmail: '',
      password: '',
    },
  })

  const handleUpdateUserEmail = async (data: UpdateUserEmailFormSchema) => {
    try {
      const response = await updateUserEmail(data)
    } catch {}
  }

  return (
    <View style={styles.formContainer}>
      {/* Título da meta */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email atual:</Text>
        <Controller
          control={control}
          name='oldEmail'
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
        {errors.oldEmail && (
          <ErrorMenssage>{errors.oldEmail.message}</ErrorMenssage>
        )}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Senha atual:</Text>
        <Controller
          control={control}
          name='password'
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
        {errors.password && (
          <ErrorMenssage>{errors.password.message}</ErrorMenssage>
        )}
      </View>
      <ModalSeparator />

      {/* Quantidade atual */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Novo nome de usuário: </Text>
        <Controller
          control={control}
          name='newEmail'
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
        {errors.newEmail && (
          <ErrorMenssage>{errors.newEmail.message}</ErrorMenssage>
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
