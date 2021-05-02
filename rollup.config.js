import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'lib/index.ts',
  output: {
    file: 'build/index.js',
    format: 'umd',
    name: 'PushAndWaitQueue'
  },
  plugins: [typescript({
    tsconfigOverride: {
      compilerOptions: { rootDir: './lib' },
      include: ['lib/**/*'],
      exclude: ['tests/**/*']
    }
  })]
}
