import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import Search from '../Search';
import styles from './Header.module.scss';

const cx = classNames.bind(styles)

function Header() {
    return (
        <>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <h2>Shopping</h2>
                    </div>
                    <div className={cx('actions')}>
                        <Link to={`/`}> 
                            <div className={cx('navigation')}>Home</div>
                        </Link>
                        <Link to={`/products`}>
                            <div className={cx('navigation')}>Shop</div>
                        </Link>
                        <Link to={`/blog`}>
                            <div className={cx('navigation')}>Blog</div>
                        </Link>
                        <Link to={`/about`}>
                            <div className={cx('navigation')}>About</div>
                        </Link>
                        <Link to={`/contact`}>
                            <div className={cx('navigation')}>Contact</div>
                        </Link>
                    </div>
                    <Search/>
                </div>
            </header>
        </>
    );
}

export default Header;