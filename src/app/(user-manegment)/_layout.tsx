import { Stack } from 'expo-router'

export default function UserManagementLayout() {
  return (
    <Stack
      options={{
        presentation: 'modal',
        headerShown: true,
      }}
    >
      <Stack.Screen
        name='update-user-data'
        options={{
          headerTitle: 'Editar dados cadastrais',
        }}
      />
    </Stack>
  )
}
