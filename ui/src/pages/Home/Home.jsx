import { useEffect, useState } from 'react';
import {NavLink, Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import banner from '../../assets/img/banner.jpg';
import card1 from '../../assets/img/card1.jpg';
import card2 from '../../assets/img/card2.jpg';
import card3 from '../../assets/img/card3.jpg';
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

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('hero')}>
                    <div className={cx('hero-offer')}>
                        <h4>Trade-in-Offer</h4>
                        <h2>Super value deals</h2>
                        <h1>On all products</h1>
                        <p>Save more with coupons & up to 70% off!</p>
                        <Link to={'/products'}>
                            <Button className={cx('shop-btn')} variant="dark">Shop Now</Button>
                        </Link>
                    </div>
                    <div className={cx('hero-banner')}>
                        <img className={cx('banner-img')} src={banner} alt="" />
                    </div>
                </div>
                <h2 className={cx('featured-title')}>Featured</h2>
                <div className={cx('featured')}>
                    <div className={cx('card-overlay')}>
                        <img className={cx('card-img')} src={card1} alt={card1} />
                        <div className={cx('card-des')}>
                            <p>Coolbag featured</p>
                            <h3>Melanophile Auguri</h3>
                            <Link to={'/products'}>
                                <Button className={cx('shop-btn')} variant="dark">Shop</Button>
                            </Link>
                        </div>
                    </div>
                    <div className={cx('card-overlay')}>
                        <img className={cx('card-img')} src={card2} alt={card2} />
                        <div className={cx('card-des')}>
                            <p>Coolbag featured</p>
                            <h3>Melanophile Auguri</h3>
                            <Link className={cx('shop-btn')} to={'/products'}>
                                <Button className={cx('shop-btn')} variant="dark">Shop</Button>
                            </Link>
                        </div>
                    </div>
                    <div className={cx('card-overlay')}>
                        <img className={cx('card-img')} src={card3} alt={card3} />
                        <div className={cx('card-des')}>
                            <p>Coolbag featured</p>
                            <h3>Melanophile Auguri</h3>
                            <Link to={'/products'}>
                                <Button className={cx('shop-btn')} variant="dark">Shop</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={cx('product')}>
                    <h2 className={cx('featured-title')}>Feature Products</h2>
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
            </div>
        </>
    )
}

export default Home;