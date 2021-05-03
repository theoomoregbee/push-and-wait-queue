
/* eslint-disable handle-callback-err, @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-expressions, @typescript-eslint/no-floating-promises */

import { expect } from 'chai'
import PushAndWaitQueue from '../lib'
import { sleep } from '../lib/utils'

describe('PushAndWaitQueue', () => {
  it('should queue up async tasks and return callbacks sequentially', async () => {
    const queue = new PushAndWaitQueue<number>()

    const calls = async (): Promise<void> =>
      await new Promise<void>(resolve => {
        let result1 = 0
        let mockTasks = 2

        const mockAsyncAction = async () => {
          await sleep(100)
          return 3
        }

        const mockAsyncAction3 = async () => {
          await sleep(100)
          return result1 + 2
        }

        const mockAsyncAction2 = async () => {
          await sleep(50)
          throw new Error('fail this mocked async action')
        }

        const onDone1 = (err?: Error, result?: number) => {
          mockTasks -= 1
          // keep track of result for usage with third async mocked action
          result1 += result as number
          expect(result).to.equal(
            3,
            'First task should return expected result when done'
          )
        }

        const onDone2 = (err?: Error) => {
          expect(err, 'should fail and still continue with queue').to.not
            .undefined
        }

        const onDone3 = (err?: Error, result?: number) => {
          mockTasks -= 1
          expect(result).to.equal(5, 'should use result from previous task')
        }

        const onComplete = () => {
          expect(mockTasks).to.equal(
            0,
            'must have finished all tasks before completing'
          )
          resolve()
        }

        queue
          .push({ action: mockAsyncAction, onDone: onDone1 })
          .then(onComplete)
        queue
          .push({ action: mockAsyncAction2, onDone: onDone2 })
          .then(() => {})
        queue
          .push({ action: mockAsyncAction3, onDone: onDone3 })
          .then(() => {})
      })

    await calls()
  })
})
