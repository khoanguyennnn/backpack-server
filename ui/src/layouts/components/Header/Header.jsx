import classNames from 'classnames/bind';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark, faSpinner, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

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
                    <div className={cx('search')}>
                        <input type="text" placeholder='Search' spellCheck={false}/>
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner}/>
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;