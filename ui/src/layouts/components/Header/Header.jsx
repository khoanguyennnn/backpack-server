import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faRightToBracket, faUserPlus, faRightFromBracket, faCircleInfo, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as userServices from '../../../services/userServices';
import logo from '../../../assets/logo/logo.jpg';
import Search from '../Search';
import styles from './Header.module.scss';
import Menu from '../../../components/Popper/Menu';
import { UserContext } from '../../../context/UserContext';

const cx = classNames.bind(styles)


function Header() {
    const [isAdmin, setIsAdmin] = useState(false);

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

    const { logout, user } = useContext(UserContext);
    const navigate = useNavigate()

    const logOutApi = async () => {
        let res = await userServices.logoutApi(localStorage.getItem('refreshToken'));
        if(res) {
            navigate('/');
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
        userInfo()
    }, [user.auth])

    return (
        <>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <img className={cx('logo-img')} src={logo} alt="melanophile_bag" />
                    </div>
                    <div className={cx('actions')}>
                        <Link to={`/`}> 
                            <div className={cx('navigation')}>Home</div>
                        </Link>
                        <Link to={`/products`}>
                            <div className={cx('navigation')}>Shop</div>
                        </Link>
                        <Link to={`/about`}>
                            <div className={cx('navigation')}>About</div>
                        </Link>
                        {
                            isAdmin && 
                            <Link to={`/dashboard`}>
                                <div className={cx('navigation')}>Dashboard (admin)</div>
                            </Link> 
                        }
                    </div>
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
                        </Link>
                        <Search/>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;