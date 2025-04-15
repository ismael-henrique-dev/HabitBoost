import { TextInput, TextInputProps } from 'react-native'

type InputProps = TextInputProps & {
  variant?: 'default' | 'password'
}

export function Input({ secureTextEntry, ...rest }: InputProps) {
  return <TextInput />
}
