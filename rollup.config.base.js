import { DEFAULT_EXTENSIONS } from '@babel/core';
import nodeResolve from '@rollup/plugin-node-resolve'; // 帮助寻找node_modules里的包
import babel from '@rollup/plugin-babel'; // rollup 的 babel 插件，ES6转ES5
import commonjs from '@rollup/plugin-commonjs'; // 将非ES6语法的包转为ES6可用
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

const config = {
    input: './src/main.ts',

    plugins: [
        json(),
        // @rollup/plugin-node-resolve
        // @rollup/plugin-babel
        // 同时使用时，nodeResolve要在babel之前
        nodeResolve(),
        babel({
            babelHelpers: 'runtime', // 打包typescript时，引用tslib的helper函数
            exclude: '**/node_modules/**', // String | RegExp | Array[...String|RegExp]
            extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'] // 只对符合后缀的文件的进行编译
        }),
        replace({
            preventAssignment: true, // 防止values里面的key 在代码中 跟单个等号（赋值操作）时，被替换
            values: {
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        commonjs(),
        typescript()
    ]
};

export default config;
