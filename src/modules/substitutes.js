export default [
  {
    regexp: /\$DATE/g,
    fn: () => new Date().toLocaleDateString()
  },
  {
    regexp: /\$RANDOM/g,
    fn: () => Math.round(Math.random() * 100)
  },
  {
    regexp: /\$CHECK/g,
    fn: () => '✓'
  },
  {
    regexp: /^\*/g,
    fn: () => '⚬  '
  }
]
