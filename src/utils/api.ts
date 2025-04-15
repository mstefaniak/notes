import { getSessionId } from "./session"

export const postNote = async (text: string) => {
  const sessionId = getSessionId()
  // TODO: sanitize text before posting
  console.log('post', sessionId, text)
}

export const getNote = async () => {
  const sessionId = getSessionId()
  console.log('get', sessionId)
}
