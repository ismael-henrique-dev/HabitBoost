import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'

const NOTIFY_IDS_KEY = 'habit_notify_ids'

export async function cancelAllNotificationsForHabit(habitId: string) {
  const stored = await AsyncStorage.getItem(NOTIFY_IDS_KEY)
  if (!stored) return

  const parsed = JSON.parse(stored)

  const ids: string[] = parsed[habitId] || []

  for (const id of ids) {
    await Notifications.cancelScheduledNotificationAsync(id)
  }

  // Remove os ids salvos
  delete parsed[habitId]
  await AsyncStorage.setItem(NOTIFY_IDS_KEY, JSON.stringify(parsed))
}
