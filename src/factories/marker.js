export const createMarker = (from, to, className) => {
  return {
    from,
    to,
    className,
    createdAt: Date.now()
  }
}
