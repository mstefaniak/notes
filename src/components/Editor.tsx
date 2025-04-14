import { useEffect, useRef } from "react"

const debounce = (callback: () => void, delay: number) => {
  let timeout: number

  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => callback(), delay)
  }
}

export const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }, [])

  const handleChange = debounce(() => {
    const target = editorRef.current as HTMLDivElement
    const text = target.innerText
    console.log(text)
  }, 1000)

  useEffect(() => {
    const editor = editorRef.current
    if (editor) {
      editor.addEventListener('input', handleChange)
    }

    return () => {
      editor?.removeEventListener('input', handleChange)
    }
  }, [])

  return <div className="editor" contentEditable ref={editorRef} />
}
