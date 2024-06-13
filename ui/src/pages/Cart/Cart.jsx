import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

const cx = classNames.bind(styles)

function Cart() {
    return (
        <>
            <div className={cx('wrapper')}>
                <h3>YOUR BAG IS EMPTY</h3>
                <p>Once you add something to your bag - it will appear here. Ready to get started?</p>
            </div>
        </>
    )
}

export default Cart;