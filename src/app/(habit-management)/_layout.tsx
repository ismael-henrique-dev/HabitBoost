import { Stack } from 'expo-router'

export default function HabitManagementLayout() {
  return (
    <Stack
      options={{
        presentation: 'modal',
        headerShown: true,
      }}
    >
      <Stack.Screen
        name='create-habit'
        options={{
          headerTitle: 'Criar habito',
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
