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

export const registerApi = async (name, email, password, address) => {
    try  {
        const res = await request.post(`user/register`, {
            name,
            email,
            password,
            address,
            role: "user"
        })
        return res
    } catch (error) {
        return error.response;
    }
}

export const userInfoApi = async () => {
    var myToken = localStorage.getItem('accessToken');
    try  {
        const res = await request.get(`user/getUser`, { headers: { "Authorization": `Bearer ${myToken}` } })
        return res
    } catch (error) {
        return error.response;
    }
}

