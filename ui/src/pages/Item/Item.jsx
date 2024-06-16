import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTruckFast, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';

import * as productServices from '../../services/productServices';
import * as cartServices from '../../services/cartServices';
import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import { baseImageURL } from '../../routes';

const cx = classNames.bind(styles)

function Item() {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [otherProduct, setOtherProduct] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServices.getOneProduct(params.slug);
            const data = await productServices.getProduct();
            setProduct(result);
            setOtherProduct(data)
        }

        fetchApi();
    }, [params.slug]);

    const handleAddCart = async (id) => {
        const res = await cartServices.addToCart(id);
        console.log(res);
    }

    return (
        <>
            <div className={cx('product')}>
                <h2>PRODUCT DETAIL</h2>
                <div className={cx('pro-container')}>
                    <div className={cx('grid-left')}>
                        <div className={cx('grid-container')}>
                            <img className={cx('image')} src={baseImageURL+product.image} alt="" />
                        </div>
                    </div>
                    <div className={cx('grid-right')}>
                        <span className={cx('tag')}>Original</span>
                        <h4 className={cx('product-title')}>{product.title}</h4>
                        <h4 className={cx('product-price')}>${product.price}</h4>
                        <button className={cx('add-to-cart-btn')} onClick={() => {handleAddCart(product._id)}}>
                            Add to Bag 
                            <FontAwesomeIcon className={cx('cart-icon')} icon={faCartShopping}/>
                        </button>
                        <h5>
                            <FontAwesomeIcon className={cx('icon')} icon={faTruckFast}/> 
                            FREE SHIPPING FOR US MEMBERS!
                        </h5>
                        <h5>
                            <FontAwesomeIcon className={cx('icon')} icon={faMoneyBillTransfer}/> 
                            EASY RETURN
                        </h5>
                        <h4 className={cx('description')}>Description</h4>
                        <h5 className={cx('product-description')}>{product.description}</h5>
                    </div>
                </div>
                <h2>You may like</h2>
                <div className={cx('other-container')}>
                    {otherProduct.map((result) => (
                        <NavLink className={cx('pro')} to={`/products/${result.slug}`} key={result._id}>
                            <img src={baseImageURL+result.image} alt="" />
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

export default Item;