import { useContext, useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTruckFast, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import * as productServices from '../../services/productServices';
import * as cartServices from '../../services/cartServices';
import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import { baseImageURL } from '../../routes';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import {SlickArrowLeft, SlickArrowRight} from '../../components/SlickArrow';

const cx = classNames.bind(styles)

function Item() {
    const {cartItemCountContext, cartItemCount} = useContext(UserContext);
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
        const cart = await cartServices.getCart();
        if(res && res.status == 403){
            toast.error('You need to Login to use this function')
        }
        if(res && res.status == 200){
            cartItemCountContext(cart.length);
            toast.success('Add to Bag successfully!')
        }
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable : false,
        prevArrow:
                <SlickArrowLeft/>,
        nextArrow:
                <SlickArrowRight/>,
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
                    <Slider {...settings}>
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
                    </Slider>
                </div>
            </div>
        </>
    )
}

export default Item;