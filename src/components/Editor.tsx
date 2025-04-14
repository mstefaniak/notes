import { useEffect, useRef } from "react"
import { debounce } from "../utils/debounce"
import { postNote } from "../utils/api"
import { getSessionText, setSessionText } from "../utils/session"

export const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const editor = editorRef.current
    if (editor) {
      editor.focus()
      editor.innerText = getSessionText()
    }


  }, [])

  const handleChange = debounce(() => {
    const editor = editorRef.current as HTMLDivElement
    const text = editor.innerText
    setSessionText(text)
    postNote(text)
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
