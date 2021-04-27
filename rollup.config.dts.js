import { merge } from 'webpack-merge';
import dts from 'rollup-plugin-dts';
import baseConfig from './rollup.config.base';

const config = merge(baseConfig, {
    output: {
        file: './lib/index.d.ts',
        format: 'es'
    },
    plugins: [dts()]
});

export default config;
