import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
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

export function UpdateUsernameForm() {
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
    console.log(data)
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
      <Button variant='secundary' onPress={handleSubmit(handleUpdateUsername)}>
        <Button.Title style={{ color: colors.zinc[50] }}>Concluir</Button.Title>
      </Button>

      <Button onPress={() => router.back()}>
        <Button.Title>Cancelar</Button.Title>
      </Button>
    </View>
  )
}
