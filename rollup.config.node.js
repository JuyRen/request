import { merge } from 'webpack-merge';
import baseConfig from './rollup.config.base';
import pkg from './package.json';

const config = merge(baseConfig, {
    output: {
        file: './lib/index.js',
        format: 'cjs',
        exports: 'default'
    }
});

export default config;
