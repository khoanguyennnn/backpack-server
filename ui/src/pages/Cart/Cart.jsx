import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faX } from '@fortawesome/free-solid-svg-icons';

import styles from './Cart.module.scss';

const cx = classNames.bind(styles)

function Cart() {
    return (
        <>
            <div className={cx('wrapper')}>
                {/* <h3>YOUR BAG IS EMPTY</h3>
                <p>Once you add something to your bag - it will appear here. Ready to get started?</p> */}
                <div className={cx('content')}>
                    <div className={cx('card')}>
                        <div className={cx('card-left')}>
                            <div className={cx('left-box')}>
                                <div className={cx('title-box')}>
                                    <h1>Shoppping Cart</h1>
                                    <h3>3 items</h3>
                                </div>
                                <hr />
                                <div className={cx('cart-box')}>
                                    <div className={cx('product-image')}>
                                        <img className={cx('image')} src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp" alt="Cotton T-shirt"/>
                                    </div>
                                    <div className={cx('product-name')}>
                                        <h3>Original</h3>
                                        <h3>Bag</h3>
                                    </div>
                                    <div className={cx('product-quantity')}>
                                        <button className={cx('quantity-btn')}>
                                            <FontAwesomeIcon icon={faMinus}/>
                                        </button>
                                        <input className={cx('quantity-input')} type="number" value={1} />
                                        <button className={cx('quantity-btn')}>
                                            <FontAwesomeIcon icon={faPlus}/>   
                                        </button>
                                    </div>
                                    <div className={cx('product-price')}>
                                        <h3>$99</h3>
                                    </div>
                                    <div className={cx('close-btn')}>
                                        <FontAwesomeIcon icon={faX}/>
                                    </div>
                                </div>
                                <hr />
                                <div className={cx('cart-box')}>
                                    <div className={cx('product-image')}>
                                        <img className={cx('image')} src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp" alt="Cotton T-shirt"/>
                                    </div>
                                    <div className={cx('product-name')}>
                                        <h3>Original</h3>
                                        <h3>Bag</h3>
                                    </div>
                                    <div className={cx('product-quantity')}>
                                        <button className={cx('quantity-btn')}>
                                            <FontAwesomeIcon icon={faMinus}/>
                                        </button>
                                        <input className={cx('quantity-input')} type="number" value={1} />
                                        <button className={cx('quantity-btn')}>
                                            <FontAwesomeIcon icon={faPlus}/>   
                                        </button>
                                    </div>
                                    <div className={cx('product-price')}>
                                        <h3>$99</h3>
                                    </div>
                                    <div className={cx('close-btn')}>
                                        <FontAwesomeIcon icon={faX}/>
                                    </div>
                                </div>
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
                                    <h2>$ 99.00</h2>
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
                                    <h2>$ 99.00</h2>
                                </div>
                                <div className={cx('order-btn')}>
                                    <button>Place order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Cart;