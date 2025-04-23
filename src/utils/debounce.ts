export const debounce = (callback: () => void, delay: number) => {
  let timeoutId: number

  return () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      callback()
    }, delay)
  }
}