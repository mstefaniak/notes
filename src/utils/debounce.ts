export const debounce = (callback: () => void, delay: number) => {
  let timeout: number

  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => callback(), delay)
  }
}