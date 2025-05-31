// app/+layout.tsx
import { router, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import 'react-native-get-random-values'
import {
  useFonts,
  Rubik_600SemiBold,
  Rubik_400Regular,
  Rubik_500Medium,
} from '@expo-google-fonts/rubik'
import { HabitProvider } from '@/contexts/habit-context'
import { CategoryProvider } from '@/contexts/category-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  createNotifications,
  SlideInLeftSlideOutRight,
} from 'react-native-notificated'
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated'
import { ToastSuccess } from '@/components/ui/toast'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { SettingsProvider } from '@/contexts/settings-context'
import { useSettings } from '@/hooks/use-settings'
import { GoalProvider } from '@/contexts/goal-context'

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Rubik_600SemiBold,
    Rubik_400Regular,
    Rubik_500Medium,
  })

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
  }, [loaded])

  if (!loaded) return null

  return <RootLayoutNav />
}

function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SettingsProvider>
        <InnerRoutes />
      </SettingsProvider>
    </GestureHandlerRootView>
  )
}

// ② Só aqui, **dentro** do SettingsProvider, podemos chamar useSettings()
function InnerRoutes() {
  // const { settings } = useSettings()
  const { NotificationsProvider } = createNotifications({
    duration: 3000,
    notificationPosition: 'top',
    animationConfig: SlideInLeftSlideOutRight,
    variants: {
      custom: {
        component: ToastSuccess,
        config: { notificationPosition: 'top', duration: 300 },
      },
    },
    gestureConfig: { direction: 'x' },
    defaultStylesSettings: {},
    isNotch: undefined,
  })

  // useEffect(() => {
  //   if (settings.firstTimeUser) {
  //     router.replace('/welcome')
  //   } else {
  //     router.replace('/')  // ou '/home' se você tiver essa rota
  //   }
  // }, [settings.firstTimeUser])

  return (
    <CategoryProvider>
      <NotificationsProvider>
        <HabitProvider>
          <GoalProvider>
            <BottomSheetModalProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='(tabs)' />
                <Stack.Screen name='(auth)' />
                <Stack.Screen name='(welcome)' />
                <Stack.Screen name='(habit-management)' />
              </Stack>
            </BottomSheetModalProvider>
          </GoalProvider>
        </HabitProvider>
      </NotificationsProvider>
    </CategoryProvider>
  )
}
