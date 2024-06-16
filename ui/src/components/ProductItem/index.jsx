import classNames from "classnames/bind";
import { Link } from 'react-router-dom';

import styles from './ProductItem.module.scss';
import { baseImageURL } from "../../routes";

const cx = classNames.bind(styles)

function ProductItem({data}) {
    return (
        <>
            <Link to={`/products/${data.slug}`}>
                <div className={cx('wrapper')}>
                    <img className={cx('product-image')} src={baseImageURL+data.image} alt={data.image}/>
                    <div className={cx('info')}>
                        <span className={cx('category')}>Original</span>
                        <span className={cx('product-name')}>{data.title}</span>
                        <p className={cx('product-price')}>{data.price}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default ProductItem;