import { getSessionId } from "./session"

export const postNote = async (text: string) => {
  const sessionId = getSessionId()
  console.log('post', sessionId, text)
}

export const getNote = async () => {
  const sessionId = getSessionId()
  console.log('get', sessionId)
}
