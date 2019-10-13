import moment from 'moment'
import 'moment-duration-format'

export const ONE_DAY_IN_MILLISECONDS = 86400000

const formatTime = (milliseconds, format = 'h:mm') => {
  const ms = milliseconds % ONE_DAY_IN_MILLISECONDS
  const duration = moment.duration(ms)
  return duration.format(format, { trim: false })
}

export default formatTime

export const getHours = milliseconds => {
  const duration = moment.duration(milliseconds)
  return duration.hours()
}

export const getMinutes = milliseconds => {
  const duration = moment.duration(milliseconds)
  return duration.minutes()
}
