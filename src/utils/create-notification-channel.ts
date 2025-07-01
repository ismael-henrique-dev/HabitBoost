import * as Notifications from 'expo-notifications'

export async function createNotificationsChannel() {
  console.log('Verificando canal de notificação...')

  const { status } = await Notifications.requestPermissionsAsync()
  if (status !== 'granted') {
    alert('Permissão para notificações foi negada')
    return
  }

  // Pega todos os canais existentes (Android)
  const existingChannels = await Notifications.getNotificationChannelsAsync()
  const habitsChannelExists = existingChannels.some(
    (channel) => channel.id === 'habits'
  )

  if (!habitsChannelExists) {
    console.log('Criando canal de notificação "habits"...')
    await Notifications.setNotificationChannelAsync('habits', {
      name: 'Habits notifications',
      importance: Notifications.AndroidImportance.HIGH,
    })
  } else {
    console.log('Canal "habits" já existe.')
  }
}
