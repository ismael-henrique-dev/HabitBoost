import * as Notifications from 'expo-notifications'

export async function createNotify(date: Date, notifyTitle: string) {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: notifyTitle,
      body: 'Lembrete do hábito, faça agora!'
    },
    trigger: {
      channelId: 'habits',
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: date,
    },
  })

  console.log("Criando notification: " + notificationId)

  return notificationId
}
