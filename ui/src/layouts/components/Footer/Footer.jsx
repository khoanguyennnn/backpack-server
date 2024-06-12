import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles)

function Footer() {
    return (
        <>
            <footer className={cx('wrapper')}>
                <div className={cx('col')}>
                    <h3>Logo</h3>
                    <p><strong>Address: </strong> Lien Khu 1-6, Binh Tan, Ho Chi Minh City, Vietnam.</p>
                    <p><strong>Phone: </strong> (+84) 947509733</p>
                    <p><strong>Hours: </strong> 9:00 - 18:00, Mon - Sat</p>
                </div>
            </footer>
        </>
    )
}

export default Footer;