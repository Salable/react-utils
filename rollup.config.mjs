import packageJson from './package.json' assert { type: 'json' };
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

/** @type import('rollup') */
export default {
  input: 'src/index.ts',
  output: {
    file: packageJson.main,
    format: 'esm',
  },
  external: ['react', 'react/jsx-runtime', 'react-dom'],
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript({ exclude: ['**/__tests__/**'] }),
  ],
};
