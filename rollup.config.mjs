import packageJson from './package.json' assert { type: 'json' };
import typescript from '@rollup/plugin-typescript';

/** @type import('rollup') */
export default {
  input: 'src/index.ts',
  output: {
    file: packageJson.main,
    format: 'esm',
  },
  external: ['react', 'react/jsx-runtime', 'react-dom'],
  plugins: [typescript({ exclude: ['**/__tests__/**'] })],
};
