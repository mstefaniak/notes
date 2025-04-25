import { useCallback, useEffect, useState } from "react"
import { getNotes } from "../utils/api"
import { Note } from "../types"

export const useGetNotes = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchNotes = useCallback(() => {
    setIsLoading(true)
    getNotes().then((notes) => {
      setNotes(notes)
    }).finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  return {
    notes,
    isLoading,
    refetch:fetchNotes,
  }
}