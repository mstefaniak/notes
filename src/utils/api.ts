import { Note } from "../types"
import { getSessionId } from "./session"

const sessionId = getSessionId()
const baseUrl = 'https://challenge.surfe.com/'
const sessionUrl = `${baseUrl}${sessionId}/`
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
}

const sanitizeText = (text: string) => {
  return text.replace(/<[^>]*>?/g, '')
}

export const postNote = async (text: string): Promise<number> => {
  const response = await fetch(`${sessionUrl}notes`, {
    method: 'POST',
    body: JSON.stringify({ body: sanitizeText(text) }),
    headers,
  })

  if (!response.ok) {
    throw new Error('Failed to add a note')
  }

  const data = await response.json()
  return data.id
}

export const getNotes = async (): Promise<Note[]> => {
  const response = await fetch(`${sessionUrl}notes`, { headers })

  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error('Failed to fetch notes')
    }
    
    return []
  }

  const data = await response.json()
  return data
}

export const putNote = async (id: number, text: string) => {
  const response = await fetch(`${sessionUrl}notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ body: sanitizeText(text) }),
    headers,
  })

  if (!response.ok) {
    throw new Error('Failed to update the note')
  }
  
  return response
}

export const getNote = async (id: number): Promise<Note> => {
  const response = await fetch(`${sessionUrl}notes/${id}`, { headers })
  const data = await response.json()
  return data.body
}

export const getUsers = async () => {
  const response = await fetch(`${baseUrl}users`, { headers })

  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error('Failed to fetch users')
    }

    return []
  }

  const data = await response.json()
  return data
}
