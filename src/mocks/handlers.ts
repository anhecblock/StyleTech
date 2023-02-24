import { rest } from 'msw';

const apiUrl =
    'https://proyecto-final-bootcamp-18e38-default-rtdb.firebaseio.com/products.json';
export const handlers = [
    rest.post(apiUrl, (_, res, ctx) => {
        return res(ctx.status(200));
    }),
];
