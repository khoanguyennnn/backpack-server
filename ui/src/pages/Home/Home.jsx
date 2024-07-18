import { useEffect, useState } from 'react';
import {NavLink, Link} from 'react-router-dom';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import banner from '../../assets/img/banner.jpg';
import card1 from '../../assets/img/card1.jpg';
import card2 from '../../assets/img/card2.jpg';
import card3 from '../../assets/img/card3.jpg';
import * as productServices from '../../services/productServices';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { baseImageURL } from '../../routes';
import Button from '../../components/Button';
import {SlickArrowLeft, SlickArrowRight} from '../../components/SlickArrow';

const cx = classNames.bind(styles)

function Home() {
    const [product, setProduct] = useState([]);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable : false,
        prevArrow: <SlickArrowLeft/>,
        nextArrow: <SlickArrowRight/>,
        responsive: [
            {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false,
            }
            },
            {
            breakpoint: 900,
            settings: {
                slidesToShow: 1,
                arrows: false,
            }
            }
        ]
    };

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
                        <div className={cx('hero-offer--btn')}>
                            <Button outline large to={'/products'}>Shop Now</Button>
                        </div>
                    </div>
                    <div className={cx('hero-banner')}>
                        <img className={cx('banner-img')} src={banner} alt="banner" />
                    </div>
                </div>
                <h2 className={cx('featured-title')}>Featured</h2>
                <div className={cx('featured')}>
                    <div className={cx('card-overlay')}>
                        <div className={cx('card-overlay-side', 'card-overlay-side-front')}>
                            <img className={cx('card-img')} src={card1} alt={card1} />
                            <div className={cx('card-des')}>
                                <p>Coolbag featured</p>
                                <h3>Melanophile Auguri</h3>
                            </div>
                        </div>
                        <div className={cx('card-overlay-side', 'card-overlay-side-back')}>
                            <div className={cx('card-des')}>
                                <p>Coolbag featured</p>
                                <h3>Melanophile Auguri</h3>
                            </div>
                            <div>
                                <Button primary large to={'/products'}>Shop Now</Button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('card-overlay')}>
                        <div className={cx('card-overlay-side', 'card-overlay-side-front')}>
                            <img className={cx('card-img')} src={card2} alt={card2} />
                            <div className={cx('card-des')}>
                                <p>Coolbag featured</p>
                                <h3>Melanophile Perla</h3>
                            </div>
                        </div>
                        <div className={cx('card-overlay-side', 'card-overlay-side-back')}>
                            <div className={cx('card-des')}>
                                <p>Coolbag featured</p>
                                <h3>Melanophile Perla</h3>
                            </div>
                            <Link to={'/products'}>
                                <Button primary large>Shop Now</Button>
                            </Link>
                        </div>
                    </div>
                    <div className={cx('card-overlay')}>
                        <div className={cx('card-overlay-side', 'card-overlay-side-front')}>
                            <img className={cx('card-img')} src={card3} alt={card3} />
                            <div className={cx('card-des')}>
                                <p>Coolbag featured</p>
                                <h3>Melanophile Catena</h3>
                            </div>
                        </div>
                        <div className={cx('card-overlay-side', 'card-overlay-side-back')}>
                            <div className={cx('card-des')}>
                                <p>Coolbag featured</p>
                                <h3>Melanophile Catena</h3>
                            </div>
                            <Link to={'/products'}>
                                <Button primary large>Shop Now</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={cx('product')}>
                    <h2 className={cx('featured-title')}>Feature Products</h2>
                    <p>Summer Collection New Morden Design</p>
                    <div className={cx('pro-container')}>
                        <Slider {...settings}>
                            {product.map((result) => (
                                <NavLink className={cx('pro')} to={`/products/${result.slug}`} key={result._id}>
                                <img src={baseImageURL+result.image} alt={result.title} />
                                <div className={cx('des')}>
                                    <span>Original</span>
                                    <h4>{result.title}</h4>
                                    <h4>✨✨✨</h4>
                                </div>
                                </NavLink>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;