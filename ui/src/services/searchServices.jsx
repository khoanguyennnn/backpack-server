import * as request from '../utils/request';

export const search = async (q) => {
    try {
        const res = await request.get(`product/search`, {
            params: {
                q
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}