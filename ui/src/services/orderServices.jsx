import * as request from '../utils/request';

export const getOrder = async () => {
    var myToken = localStorage.getItem('accessToken');
    try {
        const res = await request.get(`order/getAllOrder`, { headers: { "Authorization": `Bearer ${myToken}` }});
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const getAllOrder = async () => {
    var myToken = localStorage.getItem('accessToken');
    try {
        const res = await request.get(`order/getLogOrder`, { headers: { "Authorization": `Bearer ${myToken}` }});
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const placeOrder = async () => {
    var myToken = localStorage.getItem('accessToken');
    try {
        const res = await request.post(`order/placeOrder`,{}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${myToken}` 
            }
        });
        return res;
    } catch (error) {
        return error.response;
    }
}

export const deliveryConfirm = async (id) => {
    var myToken = localStorage.getItem('accessToken');
    try {
        const res = await request.put(`order/editStatus`,{
            _id: id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${myToken}` 
            }
        });
        return res;
    } catch (error) {
        return error.response;
    }
}

