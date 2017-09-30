function timeSince(date) {

  let seconds = Math.floor((new Date() - date) / 1000)
  let interval = Math.floor(seconds / 31536000)
  if (interval > 1) {
    return interval + "y" //years
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return interval + "M" // months
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return interval + "d" // days
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return interval + "h" // hours
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return interval + "m" //minutes
  }
  interval = Math.floor(seconds)
  if (interval > 1) {
     return interval + "s"  //seconds
  }
  return 'now'
}

function timeSinceTest(date) {
  let m = date.getMinutes()
  m = m < 10 ? `0${m}` : m
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${m}`
}

export default {
  timeSince,
  timeSinceTest
}
