let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

let days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

let list = [
  {
    regexp: /\$DATE/g,
    fn: () => new Date().toLocaleDateString()
  },
  {
    regexp: /\$RANDOM/g,
    fn: () => Math.round(Math.random() * 100).toString()
  },
  {
    regexp: /\$CHECK/g,
    fn: () => '✓'
  },
  {
    regexp: /\$TIME/g,
    fn: () => new Date().toLocaleTimeString()
  },
  {
    regexp: /\$MONTH/g,
    fn: () => months[new Date().getMonth()]
  },
  {
    regexp: /\$DAY/g,
    fn: () => days[new Date().getDay()]
  }
]

export const transformText = (text, callback) => {
  list.forEach(converter => {
    text = text.replace(converter.regexp, function (value, position) {
      let replacement = converter.fn(value, position)

      if (callback) {
        callback({
          args: arguments,
          value,
          position,
          replacement,
          previous: text
        })
      }

      return replacement
    })
  })

  return text
}

export default list
