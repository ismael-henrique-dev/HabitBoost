import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
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

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
})

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Rubik_600SemiBold,
    Rubik_400Regular,
    Rubik_500Medium,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const { NotificationsProvider } = createNotifications({
    duration: 3000,
    notificationPosition: 'top',
    animationConfig: SlideInLeftSlideOutRight,
    isNotch: undefined,
    defaultStylesSettings: {},
    gestureConfig: { direction: 'x' },
    variants: {
      custom: {
        component: ToastSuccess,
        config: {
          notificationPosition: 'top',
          duration: 300,
        },
      },
    },
  })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CategoryProvider>
        <NotificationsProvider>
          <HabitProvider>
            <BottomSheetModalProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name='(tabs)' />
                <Stack.Screen name='(auth)' />
                <Stack.Screen name='(welcome)' />
                <Stack.Screen name='(habit-management)' />
              </Stack>
            </BottomSheetModalProvider>
          </HabitProvider>
        </NotificationsProvider>
      </CategoryProvider>
    </GestureHandlerRootView>
  )
}
