import * as request from '../utils/request';

export const getProduct = async () => {
    try {
        const res = await request.get(`product/getProduct`);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const getOneProduct = async (q) => {
    try {
        const res = await request.get(`product/${q}`);
        return res;
    } catch (error) {
        console.log(error);
    }
}