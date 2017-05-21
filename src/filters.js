import Vue from 'vue'

Vue.filter('shorten', string => {
  var parts = string.split('\n')
  var first = parts[0].trim()

  if (parts.length > 1) {
    return first.length > 100 ? first.substr(0, 100) : (first + '...')
  }

  return string
})

export default {}
