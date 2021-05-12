import { randomBytes } from 'crypto'

export const generateId = async (): Promise<string> => {
  return await new Promise<string>((resolve, reject) => {
    randomBytes(16, (err, token) => {
      (err != null) ? reject(err) : resolve(token.toString('hex'))
    })
  })
}
