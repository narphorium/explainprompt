import commonjs from '@rollup/plugin-commonjs';
import resolve from "@rollup/plugin-node-resolve";
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcssPresetEnv from 'postcss-preset-env';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import postcss from 'rollup-plugin-postcss';


export default {
  input: "src/Widget.tsx",
  output: {
    file: "dist/widget.js",
    format: "esm",
    sourcemap: true,
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
};