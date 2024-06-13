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

export const sortProduct = async (sort,column, type) => {
    try {
        const res = await request.get(`product/getProduct`, {
            params: {
                _sort: sort,
                column: column,
                type: type,
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}