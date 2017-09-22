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
  return Math.floor(seconds) + "s" //seconds
}

function timeSinceTest(date) {
  let seconds = Math.floor((new Date() - date) / 1000)
  let interval = Math.floor(seconds / 31536000)
  if (interval > 1) {
    return interval + " years" //years
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return interval + " months" // months
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return interval + " days" // days
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return interval + " hours" // hours
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return interval + " minutes" //minutes
  }
  return "now" //seconds
}

export default {
  timeSince,
  timeSinceTest
}
