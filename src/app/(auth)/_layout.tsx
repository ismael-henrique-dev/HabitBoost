import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='login' />
      <Stack.Screen name='register' />
      <Stack.Screen name='send-email' />
      <Stack.Screen name='send-code' />
      <Stack.Screen name='new-password' />
      <Stack.Screen name='account-activation' />
    </Stack>
  )
}
