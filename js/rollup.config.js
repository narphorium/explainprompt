import commonjs from '@rollup/plugin-commonjs';
import resolve from "@rollup/plugin-node-resolve";
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';


export default {
  input: "src/index.ts",
  output: {
    file: "dist/library.js",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true
    }),
    commonjs({
        include: /node_modules/
    }),
    typescript({
        tsconfig: './tsconfig.json'
    }),
    terser(),
  ],
};