import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import template from 'rollup-plugin-html-literals';

export default {
  input: "include-in-command",
  output: {
    file: "include-in-command",
    format: "iife",
    plugins: [terser()],
  },
  plugins: [
    nodeResolve(),
    template(),
    postcss({
      inject: true,
      minimize: true,
    }),
  ],
};
