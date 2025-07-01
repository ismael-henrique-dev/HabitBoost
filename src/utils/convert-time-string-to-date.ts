export function convertTimeStringToDate(dateString: string, time: string): Date {
  const [hour, minute] = time.split(':').map(Number)
  const date = new Date(dateString)

  date.setHours(hour)
  date.setMinutes(minute)
  date.setSeconds(0)
  date.setMilliseconds(0)

  return date
}
