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

export const storeProduct = async (title, price, description) => {
    var myToken = localStorage.getItem('accessToken');
    try {
        const res = await request.post(`product/storeProduct`, {
            title,
            price,
            description,
            category: "men's clothing",
            rating: {
                rate: 3.9,
                count: 120
            },
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${myToken}` 
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (_id, title, price, description) => {
    var myToken = localStorage.getItem('accessToken');
    try {
        const res = await request.put(`product/editProduct`, {
            _id,
            title,
            price,
            description,
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${myToken}` 
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}