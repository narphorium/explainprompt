import commonjs from '@rollup/plugin-commonjs';
import resolve from "@rollup/plugin-node-resolve";
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcssPresetEnv from 'postcss-preset-env';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';


export default [{
  input: "src/index.ts",
  output: {
    file: "dist/library.js",
    format: "esm",
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
},{
  input: "src/Widget.tsx",
  output: {
    file: "dist/widget.js",
    format: "esm",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    nodePolyfills(),
    resolve({
        browser: true
    }),
    commonjs({
        include: /node_modules/
    }),
    typescript({
        tsconfig: './tsconfig.json'
    }),
    postcss({
      extensions: [ '.css' ],
      plugins: [
        postcssPresetEnv(),
      ]
    }),
    terser(),
  ]
}];