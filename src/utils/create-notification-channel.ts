import * as Notifications from 'expo-notifications'

export async function createNotificationsChannel() {
  console.log('NewChannel')

  const { status } = await Notifications.requestPermissionsAsync()
  if (status !== 'granted') {
    alert('Permissão para notificações foi negada')
    return
  }

  await Notifications.setNotificationChannelAsync('habits', {
    name: 'Habits notifications',
    importance: Notifications.AndroidImportance.HIGH,
  })
}
