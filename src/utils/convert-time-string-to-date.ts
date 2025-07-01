import dayjs from 'dayjs'

export function convertTimeStringToDate(
  dateString: string,
  time: string
): Date {
  const [hour, minute] = time.split(':').map(Number)

  // Cria a data com hora local usando dayjs
  const date = dayjs(dateString)
    .hour(hour)
    .minute(minute)
    .second(0)
    .millisecond(0)

  return date.toDate() // ← transforma em Date padrão para usar no trigger
}
