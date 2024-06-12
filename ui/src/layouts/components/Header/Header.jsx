import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';

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
                    <div className={cx('actions')}></div>
                    <Search/>
                </div>
            </header>
        </>
    );
}

export default Header;