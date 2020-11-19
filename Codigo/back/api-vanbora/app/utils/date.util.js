const { parse } = require('date-fns')
const { utcToZonedTime } = require('date-fns-tz')

const defaultTimeZone = 'America/Sao_Paulo'

const TIME_FORMAT = 'HH:mm'

const START_TIME = '00:00'

const END_TIME = '23:59'

const zonedDate = utcToZonedTime(new Date(), defaultTimeZone)

const convertTimeToDate = (time) => parse(time, TIME_FORMAT, zonedDate)


module.exports = {
  convertTimeToDate,
  zonedDate,
  defaultTimeZone,
  TIME_FORMAT,
  START_TIME,
  END_TIME
}
