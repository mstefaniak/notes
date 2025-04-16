export const placeCaretAtEnd = (el: HTMLElement) => {
    el.focus()
    const range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    const sel = window.getSelection()
    if (!sel) return
    sel.removeAllRanges()
    sel.addRange(range)
  }

export const getCursorPosition = () => {
  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);
  return range?.getBoundingClientRect();
};
