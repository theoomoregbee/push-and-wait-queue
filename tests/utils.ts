import shortId from 'shortid'

export const generateId = async (): Promise<string> => {
  return await new Promise<string>((resolve) => {
    resolve(shortId.generate())
  })
}
