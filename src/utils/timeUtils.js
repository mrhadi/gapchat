import moment from 'moment'

export const timeUTCOffset = offset => {
  try {
    return moment()
      .utcOffset(parseFloat(offset))
      .format('h:mm a')
  } catch (err) {
    console.log('timeUTCOffset:', err)
    return '-:-'
  }
}
