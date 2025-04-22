import { useEffect, useState } from "react"
import { getNotes } from "../utils/api"

export interface Note {
  id: number
  body: string
}

export const useGetNotes = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getNotes().then((notes) => {
      setNotes(notes)
    }).finally(() => setIsLoading(false))
  }, [])

  return {
    notes,
    isLoading,
  }
}