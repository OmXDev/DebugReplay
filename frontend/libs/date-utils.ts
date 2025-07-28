/**
 * Custom date utilities to replace date-fns
 * Provides similar functionality using native JavaScript Date methods
 */

export function formatDistanceToNow(date: Date | string, options?: { addSuffix?: boolean }): string {
  const targetDate = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffInMs = now.getTime() - targetDate.getTime()
  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInDays / 365)

  let result = ""

  if (diffInSeconds < 60) {
    result = diffInSeconds <= 1 ? "1 second" : `${diffInSeconds} seconds`
  } else if (diffInMinutes < 60) {
    result = diffInMinutes === 1 ? "1 minute" : `${diffInMinutes} minutes`
  } else if (diffInHours < 24) {
    result = diffInHours === 1 ? "1 hour" : `${diffInHours} hours`
  } else if (diffInDays < 30) {
    result = diffInDays === 1 ? "1 day" : `${diffInDays} days`
  } else if (diffInMonths < 12) {
    result = diffInMonths === 1 ? "1 month" : `${diffInMonths} months`
  } else {
    result = diffInYears === 1 ? "1 year" : `${diffInYears} years`
  }

  return options?.addSuffix ? `${result} ago` : result
}

export function format(date: Date | string, formatString: string): string {
  const targetDate = typeof date === "string" ? new Date(date) : date

  const year = targetDate.getFullYear()
  const month = targetDate.getMonth() + 1
  const day = targetDate.getDate()
  const hours = targetDate.getHours()
  const minutes = targetDate.getMinutes()
  const seconds = targetDate.getSeconds()

  const pad = (num: number, length = 2): string => {
    return num.toString().padStart(length, "0")
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Replace format tokens
  return formatString
    .replace(/yyyy/g, year.toString())
    .replace(/yy/g, year.toString().slice(-2))
    .replace(/MMMM/g, monthNames[month - 1])
    .replace(/MMM/g, monthNamesShort[month - 1])
    .replace(/MM/g, pad(month))
    .replace(/M/g, month.toString())
    .replace(/dd/g, pad(day))
    .replace(/d/g, day.toString())
    .replace(/HH/g, pad(hours))
    .replace(/H/g, hours.toString())
    .replace(/hh/g, pad(hours > 12 ? hours - 12 : hours === 0 ? 12 : hours))
    .replace(/h/g, (hours > 12 ? hours - 12 : hours === 0 ? 12 : hours).toString())
    .replace(/mm/g, pad(minutes))
    .replace(/m/g, minutes.toString())
    .replace(/ss/g, pad(seconds))
    .replace(/s/g, seconds.toString())
    .replace(/a/g, hours >= 12 ? "pm" : "am")
    .replace(/A/g, hours >= 12 ? "PM" : "AM")
    .replace(/EEEE/g, dayNames[targetDate.getDay()])
    .replace(/EEE/g, dayNamesShort[targetDate.getDay()])
}

export function parseISO(dateString: string): Date {
  return new Date(dateString)
}

export function addDays(date: Date, amount: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + amount)
  return result
}

export function addHours(date: Date, amount: number): Date {
  const result = new Date(date)
  result.setHours(result.getHours() + amount)
  return result
}

export function addMinutes(date: Date, amount: number): Date {
  const result = new Date(date)
  result.setMinutes(result.getMinutes() + amount)
  return result
}

export function subDays(date: Date, amount: number): Date {
  return addDays(date, -amount)
}

export function subHours(date: Date, amount: number): Date {
  return addHours(date, -amount)
}

export function subMinutes(date: Date, amount: number): Date {
  return addMinutes(date, -amount)
}

export function isAfter(date: Date, dateToCompare: Date): boolean {
  return date.getTime() > dateToCompare.getTime()
}

export function isBefore(date: Date, dateToCompare: Date): boolean {
  return date.getTime() < dateToCompare.getTime()
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function startOfDay(date: Date): Date {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  return result
}

export function endOfDay(date: Date): Date {
  const result = new Date(date)
  result.setHours(23, 59, 59, 999)
  return result
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

export function isYesterday(date: Date): boolean {
  const yesterday = subDays(new Date(), 1)
  return isSameDay(date, yesterday)
}

export function formatRelative(date: Date | string): string {
  const targetDate = typeof date === "string" ? new Date(date) : date

  if (isToday(targetDate)) {
    return `Today at ${format(targetDate, "HH:mm")}`
  }

  if (isYesterday(targetDate)) {
    return `Yesterday at ${format(targetDate, "HH:mm")}`
  }

  const now = new Date()
  const diffInDays = Math.floor((now.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24))

  if (diffInDays < 7) {
    return `${format(targetDate, "EEE")} at ${format(targetDate, "HH:mm")}`
  }

  if (targetDate.getFullYear() === now.getFullYear()) {
    return format(targetDate, "MMM d, HH:mm")
  }

  return format(targetDate, "MMM d, yyyy")
}

// Utility function for creating date ranges
export function getDateRange(days: number): { start: Date; end: Date } {
  const end = new Date()
  const start = subDays(end, days)
  return { start: startOfDay(start), end: endOfDay(end) }
}

// Utility function for checking if date is within range
export function isWithinRange(date: Date, start: Date, end: Date): boolean {
  return date >= start && date <= end
}
