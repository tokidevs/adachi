import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  target: 'es2022',
  external: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion'],
  noExternal: ['focus-trap-react'],
  esbuildOptions(options) {
    options.logOverride = { 'this-is-undefined-in-esm': 'silent' }
  },
})
