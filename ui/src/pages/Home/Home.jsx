import { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';

import * as productServices from '../../services/productServices';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles)

function Home() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServices.getProduct();
            setProduct(result);
        }

        fetchApi();
    }, []);
    console.log(product)

    return (
        <>
            <div className={cx('product')}>
                <h2>Feature Products</h2>
                <p>Summer Collection New Morden Design</p>
                <div className={cx('pro-container')}>
                    {product.map((result) => (
                        <NavLink className={cx('pro')} to={`/products/${result.slug}`} key={result._id}>
                            <img src={result.image} alt="" />
                            <div className={cx('des')}>
                                <span>Original</span>
                                <h4>{result.title}</h4>
                                <h4>${result.price}</h4>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home;