import Request from './http';

const EasyHttp = new Request(
    {},
    {
        response: [config => config.data]
    }
);

export default EasyHttp;
