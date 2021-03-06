export const hex = (value) => value.toString(36)

export const ID = (() => {
  let counter = 0
  return () => hex(counter++) + hex(Date.now())
})()

export const getWordCount = (text) => {
  const matches = text.match(/\S+/g)
  return matches ? matches.length : 0
}

export const download = (filename, text) => {
  var element = document.createElement('a')
  var href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)

  element.setAttribute('href', href)
  element.setAttribute('download', filename)
  element.style.display = 'none'

  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export default {
  ID,
  hex,
  download
}
