### 基于 Axios 封装 Request

1. `npm install @juyren/request -D`

2. `import Request, { EasyHttp } from '@juyren/request'`

3.

```
    // 根据配置，进行初始化实例
    // 第一个参数为： config，
    // 第二个参数为: interceptors
    const Http = new Request({
        baseURL: 'xxx',
    }, {
        request: [
            (config) => config
        ],
        response: [
            (config) => config
        ]
    })

    Http.get()
    Http.post()

    // 或者

    EasyHttp.post()
    EasyHttp.get()
    ...
```
