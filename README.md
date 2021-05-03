[![Build Status - GitHub Actions][gha-badge]][gha-ci]
[![semantic-release][semantic-release-badge]][semantic-release]
[![npm][npm-version-badge]][npm]
[![npm][npm-license-badge]][npm]

# PushAndWaitQueue

A simple Promise based queue, that allows you to push(enqueue) actions and wait till it gets to their turn before resolving or also wait for the entire queue to be empty before resolving.

> Queue up [idempotent operations](https://en.wikipedia.org/wiki/Idempotence) that can run simultaneously and return the same value even when there's a dependency that can cause the operation to return different value. For example, you can queue up all calls to find or create an entity if not available, if available return the value. If the call is run simultaneously, we might end up with a lot of created entities. With Queue, you can add any call to the queue, so they are waiting for the first find or create operation to be done before returning the entity. see [unique user id test](/tests/unique-user-id.test.ts)

```sh
yarn add push-and-wait-queue
```

```sh
npm install push-and-wait-queue
```

Browser, you can use [UNPKG](https://unpkg.com/) or [JSDelivr](https://www.jsdelivr.com/)

```html
<script src="https://cdn.jsdelivr.net/npm/push-and-wait-queue@latest/build/index.min.js"></script>
```

## APIs

### Init

```ts
const queue = new PushAndWaitQueue();
```

### Enqueue tasks

```ts
import PushAndWaitQueue from "push-and-wait-queue";

const queue = new PushAndWaitQueue();

queue.push(task: ITask);

interface ITask<T> {
    action: ()=>Promise<T>
    onDone?: (err: Error|undefined, result?: T)=>void
}
```

| Task fields | Description                                                                         |
| ----------- | ----------------------------------------------------------------------------------- |
| `action`    | `required` a function that returns a Promise                                        |
| `onDone`    | `optional` a function that handles either the result or error from `action` promise |

## Usage

see [tests](/tests)

```js
import PushAndWaitQueue from "push-and-wait-queue";

const queue = new PushAndWaitQueue();
const valueFromTask1;
const task1 = {
  action: async () => {
    // long running process
    // return value
    return "3000 entities";
  },
  onDone: (err, resultOfAction) => {
    valueFromTask1 = resultOfAction;
  },
};
const task2 = {
  action: async () => {
    // use value from last tasks
    return `with value is ${valueFromTask1}`;
  },
  onDone: (err, resultOfAction) => {
    console.log(resultOfAction);
  },
};
queue.push(task1).then(() => {});
queue.push(task2).then(() => {});
```

### Wait for Queue to be Idle or completed

You can wait at any time for a queue to be done or idle via `.push(...).then` since it returns a running instance of the queue

```ts
...
const onQueueCompleted = () => {
    console.log('queue is idle/completed')
}

queue.push(...).then(onQueueCompleted)
```

## Contributing

Clone repo and run

```sh
yarn install
```

### Commits pattern

Every PR title or at least one commit must follow [conventional commit message](https://www.conventionalcommits.org/en/) pattern.

### Available dev scripts:

### `yarn start`

Start the library build and test in watch mode for every file edit.

### `yarn build`

Build distribution bundle to `./build/` directory.

### `yarn test`

[Lints](#yarn-lint) and test library.

### `yarn lint`

Uses [ts-standard](https://github.com/standard/ts-standard) for linting so you don't have to worry about [ESLint](https://eslint.org/) configurations

### `yarn lint:fix`

Automatically fixes any lint errors encountered.

### `yarn build:watch`

Run [build script](#yarn-build) in watch mode.

[gha-badge]: https://github.com/theoomoregbee/push-and-wait-queue/actions/workflows/test.yml/badge.svg
[gha-ci]: https://github.com/theoomoregbee/push-and-wait-queue/actions/workflows/test.yml
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release]: https://github.com/semantic-release/semantic-release
[npm-version-badge]: https://img.shields.io/npm/v/push-and-wait-queue.svg
[npm]: https://www.npmjs.com/package/push-and-wait-queue
[npm-license-badge]: https://img.shields.io/npm/l/push-and-wait-queue.svg
