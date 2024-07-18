import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faRightToBracket, faUserPlus, faRightFromBracket, faCircleInfo, faClockRotateLeft, faBars, faX, faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as userServices from '../../../services/userServices';
import logo from '../../../assets/logo/logo.jpg';
import Search from '../Search';
import styles from './Header.module.scss';
import Menu from '../../../components/Popper/Menu';
import { UserContext } from '../../../context/UserContext';
import * as cartServices from '../../../services/cartServices';
import Cart from '../../../pages/Cart';

const cx = classNames.bind(styles)


function Header() {
    const [products, setProducts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOn, setIsOn] = useState(true);
    const navRef = useRef();
    const navOverlayRef = useRef();

    // Re-render components
    const getData = function(data){
        setProducts(data);
    };
    // Listen resolution change
    var x = window.matchMedia("(max-width: 1200px)")

    function transformNavRef(x) {
        try {
            if (x.matches) { // If media query matches
                navRef.current.style.transform = "translateX(100%)";
            } else {
                navRef.current.style.transform = "translateX(0)";
            }
        } catch (error) {
        }
    }

    x.addEventListener("change", function() {
        transformNavRef(x);
    });

    // Showing nav bar for mobile
    const showNavBar = () => {
        if (isOn == true){
            setIsOn(false);
            navRef.current.style = 'transform: translateX(0);';
            navOverlayRef.current.style = 'display: block';
        } else if(isOn == false) {
            setIsOn(true);
            navRef.current.style = 'transform: translateX(100%);';
            navOverlayRef.current.style = 'display: none';
        }
    }

    // Check is tabport screen
    const isShowNavBar = () => {
        var width = window.innerWidth;
        if (width <= 1200){
            showNavBar();
        }
        return;
    }

    const MENU_ITEMS_LOGIN = [
        {
            icon: <FontAwesomeIcon icon={faCircleInfo} />,
            title: 'Account',
            to: '/profile'
        },
        {
            icon: <FontAwesomeIcon icon={faClockRotateLeft}/>,
            title: 'History',
            to: '/history'
        },
        {
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            title: 'Log out',
            action: function(){
                logOutApi()
                logout()
            }
        },
    ]

    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faRightToBracket} />,
            title: 'Log in',
            to: '/login'
        },
        {
            icon: <FontAwesomeIcon icon={faUserPlus} />,
            title: 'Sign up',
            to: '/signup'
        },
    ]

    const { logout, user, cartItemCount, cartItemCountContext } = useContext(UserContext);
    const navigate = useNavigate()

    const logOutApi = async () => {
        let res = await userServices.logoutApi(localStorage.getItem('refreshToken'));
        if(res) {
            navigate('/');
            cartItemCountContext(0);
        } 
    }

    useEffect(() => {
        const userInfo = async () => {
            let res = await userServices.userInfoApi(); 
            if(res && res.role === "admin") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        }
        getData(localStorage.getItem('cartItemCount'))
        userInfo()
    }, [user.auth])

    return (
        <>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <img className={cx('logo-img')} src={logo} alt="melanophile_bag" />
                    </div>
                    <input type="checkbox" hidden className={cx('nav__input')} id={cx('nav__mobile-input')} />
                    <div ref={navRef} className={cx('wrapper-action')}>
                        <label htmlFor="nav__mobile-input" onClick={showNavBar} className={cx('close-btn')}>
                            <FontAwesomeIcon icon={faX} />
                        </label>
                        <div className={cx('actions')}>
                            <Link to={`/`} onClick={isShowNavBar}> 
                                <div className={cx('navigation')}>Home</div>
                            </Link>
                            <Link to={`/products`} onClick={isShowNavBar}>
                                <div className={cx('navigation')}>Shop</div>
                            </Link>
                            <Link to={`/about`} onClick={isShowNavBar}>
                                <div className={cx('navigation')}>About</div>
                            </Link>
                            {isAdmin && 
                            <Link to={`/dashboard`} onClick={isShowNavBar}>
                                <div className={cx('navigation')}>Dashboard (admin)</div>
                            </Link>}
                            <div className={cx('actions-function')}>
                                <span>Shopping</span>
                                <Link className={cx('cart')} to={`/cart`} onClick={isShowNavBar}>
                                    <div className={cx('navigation')}>
                                        <div>
                                            <FontAwesomeIcon className={cx('cart-icon')} icon={faCartShopping}/>
                                            {(cartItemCount != 0 && cartItemCount != null) && 
                                            <div className={cx('navigation__circle-number')}>
                                                {cartItemCount}
                                            </div>
                                            }
                                        </div>
                                        Cart
                                    </div>
                                </Link>
                                <span>Account</span>
                                {user && user.auth ?
                                    MENU_ITEMS_LOGIN.map((value, index) => (
                                        <Link key={index} className={cx('cart')} to={value.to} onClick={isShowNavBar}>
                                            <div className={cx('navigation')} onClick={() => {value.action()}}>
                                                {value.icon} {value.title}
                                            </div>
                                        </Link>
                                    )) 
                                    :
                                    MENU_ITEMS.map((value, index) => (
                                        <Link key={index} className={cx('cart')} to={value.to} onClick={isShowNavBar}>
                                            <div className={cx('navigation')} onClick={() => {value.action()}}>
                                                {value.icon} {value.title}
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <Search/>
                    <div className={cx('actions2')}>
                        <Menu 
                            items={user && user.auth ? MENU_ITEMS_LOGIN : MENU_ITEMS }
                        >
                            <button className={cx('profile-btn')}>
                                <FontAwesomeIcon icon={faUser}/>
                            </button>
                        </Menu>
                        <Link className={cx('cart')} to={`/cart`}>
                            <FontAwesomeIcon className={cx('cart-icon')} icon={faCartShopping}/>
                            {(cartItemCount != 0 && cartItemCount != null) && 
                                <div className={cx('navigation__circle-number')}>
                                    {cartItemCount}
                                </div>
                            }
                        </Link>
                    </div>
                    <div className={cx('nav__mobile-action')}>
                        <label htmlFor="nav__mobile-input" className={cx('action-btn')} onClick={()=> showNavBar()}>
                            <FontAwesomeIcon icon={faBars} />
                        </label>
                    </div>
                    <label ref={navOverlayRef} htmlFor="nav__mobile-input" className={cx('nav__overlay')} onClick={()=> showNavBar()}></label>
                </div>
            </header>
        </>
    );
}

export default Header;