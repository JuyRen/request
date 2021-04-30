import Request from './request';

const EasyHttp = new Request(
    {},
    {
        response: [config => config.data]
    }
);

export default EasyHttp;
