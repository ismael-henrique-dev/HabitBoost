import * as Notifications from 'expo-notifications'
import dayjs from 'dayjs'

export async function scheduleHabitNotificationsForDates(
  title: string,
  reminderTime: string,
  dates: string[]
) {
  const [hourStr, minuteStr] = reminderTime.split(':')
  const hour = parseInt(hourStr)
  const minute = parseInt(minuteStr)

  for (const dateString of dates) {
    const dateTime = dayjs(dateString).set('hour', hour).set('minute', minute).set('second', 0)

    if (dateTime.isBefore(dayjs())) continue

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Lembrete de hábito 🧠',
        body: `Hora de realizar: ${title}`,
        sound: true,
      },
      trigger: dateTime.toDate() as unknown as Notifications.NotificationTriggerInput,
    })
  }
}
