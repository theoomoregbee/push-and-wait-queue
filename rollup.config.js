import typescript from 'rollup-plugin-typescript2'
import { name } from './package.json'

export default {
  input: 'lib/index.ts',
  output: {
    file: 'build/index.js',
    format: 'umd',
    name
  },
  plugins: [typescript({
    tsconfigOverride: {
      compilerOptions: { rootDir: './lib' },
      include: ['lib/**/*'],
      exclude: ['tests/**/*']
    }
  })]
}
