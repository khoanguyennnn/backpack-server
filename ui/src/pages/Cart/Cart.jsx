import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faX } from '@fortawesome/free-solid-svg-icons';

import * as cartServices from '../../services/cartServices';
import styles from './Cart.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)

function Cart() {
    const [products, setProducts] = useState([]);
    const [reRender, setReRender] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();

    let price = 0;
   
    useEffect(() => {
        const fetchApi = async () => {
            const res = await cartServices.getCart();
            if( res && res.length > 0){
                setProducts(res)
                setTotalPrice(
                    (res
                        .map((value) => {
                            price = value.quantity * value.product.price
                            return price
                        })
                        .reduce((partialSum, a) => partialSum + a, 0)
                    ).toFixed(2)
                )
            } else {
                setProducts(res)
                setTotalPrice(0)
            }
        }
        fetchApi()
    }, [reRender])
    
    const removeCart = async (productId) => {
        await cartServices.removeCart(productId);
        setReRender(!reRender);
    }

    const handleClickItemImage = (slug) => {
        navigate(`/products/${slug}`)
    }

    const handleClickPlusBtn = async (productId) => {
        await cartServices.addToCart(productId)
        setReRender(!reRender);
    }

    const handleClickMinusBtn = async (productId) => {
        await cartServices.subtractCart(productId)
        setReRender(!reRender);
    }

    return (
        <>
            <div className={cx('wrapper')}>
                {products?.length === 0 ? (
                    <>
                        <div>
                            <h3>YOUR BAG IS EMPTY</h3>
                            <p>Once you add something to your bag - it will appear here. Ready to get started?</p>
                        </div>
                    </>
                ) : (
                    <div className={cx('content')}>
                        <div className={cx('card')}>
                            <div className={cx('card-left')}>
                                <div className={cx('left-box')}>
                                    <div className={cx('title-box')}>
                                        <h1>Shoppping Cart</h1>
                                        <h3>{products.length} items</h3>
                                    </div>
                                    {products.map((product, index) => (
                                        <div key={index}>
                                            <hr/>
                                            <div className={cx('cart-box')}>
                                                <div className={cx('product-image')} onClick={() => {handleClickItemImage(product.product.slug)}}>
                                                    <img 
                                                        className={cx('image')} 
                                                        src={product.product.image} 
                                                        alt={product.product.title}
                                                    />
                                                </div>
                                                <div className={cx('product-name')}>
                                                    <h3>Original</h3>
                                                    <h3>{product.product.title}</h3>
                                                </div>
                                                <div className={cx('product-quantity')}>
                                                    <button className={cx('quantity-btn')} onClick={() => {handleClickMinusBtn(product.product._id)}}>
                                                        <FontAwesomeIcon icon={faMinus}/>
                                                    </button>
                                                    <input className={cx('quantity-input')} readOnly type="number" value={product.quantity}/>
                                                    <button className={cx('quantity-btn')} onClick={() => {handleClickPlusBtn(product.product._id)}}>
                                                        <FontAwesomeIcon icon={faPlus}/>   
                                                    </button>
                                                </div>
                                                <div className={cx('product-price')}>
                                                    <h3>$ {(product.product.price * product.quantity).toFixed(2)}</h3>
                                                </div>
                                                <div 
                                                    className={cx('close-btn')} 
                                                    onClick={() => {removeCart(product.product._id)}}
                                                >
                                                    <FontAwesomeIcon icon={faX}/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('card-right')}>
                                <div className={cx('right-box')}>
                                    <div className={cx('sumary-box')}>
                                        <h1>Summary</h1>
                                    </div>
                                    <hr />
                                    <div className={cx('cart-info')}>
                                        <h2>Products</h2>
                                        <h2>$ {totalPrice}</h2>
                                    </div>
                                    <div className={cx('cart-info')}>
                                        <h2>Shipping</h2>
                                        <h2>Free</h2>
                                    </div>
                                    <hr />
                                    <div className={cx('cart-info')}>
                                        <div>
                                            <h2>Total amount</h2>
                                            <h2>Including VAT</h2>
                                        </div>
                                        <h2>$ {totalPrice}</h2>
                                    </div>
                                    <div className={cx('order-btn')}>
                                        <button>Place order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}    
            </div>
            
        </>
    )
}

export default Cart;