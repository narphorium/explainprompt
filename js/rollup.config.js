import commonjs from '@rollup/plugin-commonjs';
import resolve from "@rollup/plugin-node-resolve";
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcssInlineSvg from 'postcss-inline-svg';
import postcssPresetEnv from 'postcss-preset-env';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import postcss from 'rollup-plugin-postcss';


const packageJson = require("./package.json");

export default {
  input: "src/index.ts",
  output: [{
    name: packageJson.name,
    file: "dist/index.umd.js",
    format: "umd",
  }, {
    file: "dist/index.esm.js",
    format: "esm",
  }],
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
        postcssInlineSvg(),
      ]
    }),
    terser(),
  ],
};