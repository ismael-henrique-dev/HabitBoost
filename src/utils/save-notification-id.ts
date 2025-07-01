import AsyncStorage from '@react-native-async-storage/async-storage'

const NOTIFY_IDS_KEY = 'habit_notify_ids'

export async function saveNotificationId(habitId: string, notificationId: string) {
  try {
    const stored = await AsyncStorage.getItem(NOTIFY_IDS_KEY)
    const parsed = stored ? JSON.parse(stored) : {}

    // Salva por hábito (supondo que um hábito tenha múltiplas notificações)
    if (!parsed[habitId]) {
      parsed[habitId] = []
    }

    parsed[habitId].push(notificationId)

    await AsyncStorage.setItem(NOTIFY_IDS_KEY, JSON.stringify(parsed))
  } catch (error) {
    console.error('Erro ao salvar notificationId:', error)
  }
}
