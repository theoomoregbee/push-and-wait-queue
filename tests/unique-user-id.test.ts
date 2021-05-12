
/* eslint-disable handle-callback-err, @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-expressions, @typescript-eslint/no-floating-promises, @typescript-eslint/strict-boolean-expressions */

import { expect } from 'chai'

import PushAndWaitQueue from '../lib'
import { generateId } from './utils'

const uniqueUserQueue = new PushAndWaitQueue<string>()

const memory: {userId?: string} = {}

const getUserId = async (): Promise<string> => {
  return await new Promise<string>((resolve, reject) => {
    const action = async () => {
      if (memory.userId) {
        return memory.userId
      }

      memory.userId = await generateId()
      return memory.userId
    }

    uniqueUserQueue.push({
      action,
      onDone: (err, id) => {
        if (err != null) {
          return reject(err)
        }

        if (id) {
          resolve(id)
        }
      }
    }).then(() => {})
  })
}

describe('unique user id example', () => {
  it('idempotent operation: should return the same value for every call or even when called the same time', async () => {
    const results: string[] = []
    getUserId().then(id => {
      results.push(id)
    })
    getUserId().then(id => {
      results.push(id)
    })
    getUserId().then(id => {
      results.push(id)
    })

    expect(results.every(id => id === memory.userId), 'every value should returned the first generated value').to.be.true
  })
})
