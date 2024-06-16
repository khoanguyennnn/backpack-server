import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
}

export const post = async (path, options = {}, config) => {
    const response = await request.post(path, options, config);
    return response
}

export const del = async (path, config) => {
    const response = await request.delete(path, config);
    return response
}

export const patch = async (path, options = {}, config) => {
    const response = await request.patch(path, options = {}, config);
    return response.data;
}

export const put = async (path, options = {}, config) => {
    const response = await request.put(path, options, config);
    return response
}

export default request;