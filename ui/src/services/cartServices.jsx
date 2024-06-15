import * as request from '../utils/request';

export const getCart = async () => {
    var myToken = localStorage.getItem('accessToken');
    try {
        const res = await request.get(`product/getCart`, { headers: { "Authorization": `Bearer ${myToken}` }});
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const removeCart = async (id) => {
    var myToken = localStorage.getItem('accessToken');
    try {
        const res = await request.del(`product/removeCart`,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${myToken}` 
            },
            data: {
                _id: id
            }
          });
        return res;
    } catch (error) {
        return error.response;
    }
}

export const addToCart = async (id) => {
    var myToken = localStorage.getItem('accessToken');
    try {
        const res = await request.post(`product/addToCart`,{
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

export const subtractCart = async (id) => {
    var myToken = localStorage.getItem('accessToken');
    try {
        const res = await request.post(`product/subtractCart`,{
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
