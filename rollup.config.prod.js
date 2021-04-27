import { merge } from 'webpack-merge';
import { terser } from 'rollup-plugin-terser';
import baseConfig from './rollup.config.base';
import pkg from './package.json';

const config = merge(baseConfig, {
    output: {
        file: './lib/index.js',
        format: 'es',
        exports: 'auto'
    },
    plugins: [terser()]
});

export default config;
