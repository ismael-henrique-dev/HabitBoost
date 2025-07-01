import { Habit } from '@/types/habit'
import { convertTimeStringToDate } from './convert-time-string-to-date'
import { createNotificationsChannel } from './create-notification-channel'
import { createNotify } from './create-notification'
import { saveNotificationId } from './save-notification-id'
import { notify } from 'react-native-notificated'
import * as Notifications from 'expo-notifications'

export async function scheduleHabitNotifications(habitsToSchedule: Habit[]) {
  createNotificationsChannel()
  await Notifications.cancelAllScheduledNotificationsAsync()

  let count = 0

  for (const habit of habitsToSchedule) {
    if (habit.reminderTime && habit.statusByDate) {
      const dates = Object.keys(habit.statusByDate)

      for (const date of dates) {
        // status precisa ser algo que deva ser lembrado?
        const status = habit.statusByDate[date]
        if (status !== 'unstarted') continue

        const notificationDate = convertTimeStringToDate(
          date,
          habit.reminderTime
        )

        if (notificationDate.getTime() > Date.now()) {
          const notificationId = await createNotify(
            notificationDate,
            habit.title
          )
          await saveNotificationId(habit.id, notificationId)
          count++
        }
      }
    }
  }

  if (count > 0) {
    notify('custom' as any, {
      params: {
        customTitle: `${count} lembrete(s) agendado(s) com sucesso!`,
        type: 'success',
      },
      config: {
        duration: 3000,
      },
    })
  }
}
