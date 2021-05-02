# rollup-typescript-lib-starter

Just a boilerplate for building a library with TS + Github action for testing.

Configured with:

- [Rollup](https://rollupjs.org/) module bundler
- [Typescript](https://www.typescriptlang.org/) [4.2](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-2.html)
- [StandardJs](https://standardjs.com/) linter and formatter
- [Mocha](https://mochajs.org/) with [Chai](https://www.chaijs.com/) for unit testing
- Simple example of TypeScript code and unit test
- [Github Actions](https://github.com/features/actions) Test workflow

## Build Configuration

- Use `package.json` `name` field as the name of the library when bundling for browsers
- type definition is exposed via `types` field in `package.json`
- `main` entry point field within `package.json` targets the bundled distribution

> Note: update `main` and `types` when build directory is changed.

## Github Actions Test workflow

Automatically runs when you push to `main` branch or a pull request pointing to `main` branch.

see [test.yml](./.github/workflows/test.yml)

## Available scripts

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
