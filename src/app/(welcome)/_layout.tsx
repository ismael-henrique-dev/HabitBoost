import { Stack } from 'expo-router'

export default function WelcomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='confirm-email' />
      <Stack.Screen name='welcome' />
    </Stack>
  )
}
