### 基于 Axios 封装 Request

1. `npm install @juyren/request -D`

2. `import { Request, EasyHttp } from '@juyren/request'`

3.

```
    const Http = new Request()
    Http.get()
    Http.post()

    // 或者

    EasyHttp.post()
    EasyHttp.get()
    ...
```
