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

export const storeProduct = async (formData) => {
    var myToken = localStorage.getItem('accessToken');
    try {
        const res = await request.post(`product/storeProduct`, formData , {
            headers: {
                'Content-Type': "multipart/form-data",
                'Authorization': `Bearer ${myToken}` 
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (formData) => {
    var myToken = localStorage.getItem('accessToken');
    try {
        const res = await request.put(`product/editProduct`, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
                'Authorization': `Bearer ${myToken}` 
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (id) => {
    var myToken = localStorage.getItem('accessToken');
    try {
        const res = await request.del(`product/delete`,{
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
