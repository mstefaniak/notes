import { v4 as uuidv4 } from 'uuid'

export const getSessionId = () => {
  const sessionId = sessionStorage.getItem('notesAppSessionId')

  if (!sessionId) {
    const newSessionId = uuidv4()
    sessionStorage.setItem('notesAppSessionId', newSessionId)
    return newSessionId
  }

  return sessionId
}

export const getSessionText = () => {
  const sessionId = getSessionId()
  const text = sessionStorage.getItem(`notesAppText-${sessionId}`)
  return text ?? ''
}

export const setSessionText = (text: string) => {
  const sessionId = getSessionId()
  sessionStorage.setItem(`notesAppText-${sessionId}`, text)
}


