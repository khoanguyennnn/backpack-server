import * as request from '../utils/request';

export const loginApi = async (email, password) => {
    try {
        const res = await request.post(`user/login`, {
            email, 
            password
        });
        return res;
    } catch (error) {
        return error.response;
    }
}

export const logoutApi = async (token) => {
    try {
        const res = await request.del(`user/logout`, {data : {
            token
        }});
        return res;
    } catch (error) {
        return error.response;
    }
}