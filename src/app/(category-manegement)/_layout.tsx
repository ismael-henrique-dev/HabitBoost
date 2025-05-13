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
        name='create-category'
        options={{
          headerTitle: 'Criar categoria',
        }}
      />
      
    </Stack>
  )
}
