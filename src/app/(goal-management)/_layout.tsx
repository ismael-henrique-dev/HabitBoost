import { Stack } from 'expo-router'

export default function GoalsManagementLayout() {
  return (
    <Stack
      options={{
        presentation: 'modal',
        headerShown: true,
      }}
    >
      <Stack.Screen
        name='create-goal'
        options={{
          headerTitle: 'Criar meta',
        }}
      />
      <Stack.Screen
        name='update-habit'
        options={{
          headerTitle: 'Editar habito',
        }}
      />
    </Stack>
  )
}
