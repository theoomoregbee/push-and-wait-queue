import { sleep } from './utils'

interface ITask<T> {
  action: () => Promise<T>
  onDone?: (err: Error | undefined, result?: T) => void
}

class PushAndWaitQueue<T> {
  private _isRunning = false
  tasks: Array<ITask<T>> = []

  private async _running (): Promise<void> {
    while (this._isRunning) {
      await sleep(0)
    }

    while (this.tasks.length > 0) {
      this._isRunning = true
      const task = this.tasks.shift()
      if (task != null) {
        const { action, onDone = () => { } } = task
        try {
          const result = await action()
          onDone(undefined, result)
        } catch (err) {
          onDone(err)
        }
      }
    }

    this._isRunning = false
  }

  async push (task: ITask<T>): Promise<void> {
    this.tasks.push(task)

    return await this._running()
  }
}

export default PushAndWaitQueue
