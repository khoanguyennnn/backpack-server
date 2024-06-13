import { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpAZ, faArrowDownAZ, faArrowUp19, faArrowDown19 } from '@fortawesome/free-solid-svg-icons';

import * as productServices from '../../services/productServices';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';

const cx = classNames.bind(styles)

function Product() {
    const [product, setProduct] = useState([]);

    const [sort, setSort] = useState(undefined);
    const [column, setColumn] = useState('');
    const [type, setType] = useState('');

    const handleSort = (sort, column, type) => {
        setSort(sort);
        setType(type);
        setColumn(column);
    }

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServices.sortProduct(sort, column, type);
            setProduct(result);
        }
        fetchApi();
    }, [sort, type, column]);

    return (
        <>
            <div className={cx('product')}>
                <div className={cx('pro-header')}>
                    <div className={cx('heading')}>
                        <h2 className={cx('heading-title')}>PICK YOUR STYLE & FEATURE</h2>
                        <p className={cx('heading-des')}>If you're bored with what's in your bag, it's time to change it up with our new bag launches. Find the latest bag collections designed to show off your best style.</p>
                    </div>
                    <DropdownButton
                        align="end"
                        title="Filter & Sort"
                        id="dropdown-menu-align-end"
                        variant="dark"
                        className={cx('sort-btn')}
                    >
                        <Dropdown.Item onClick={() => {handleSort(true, 'title', 'desc')}}>
                            Name: from Z to A <FontAwesomeIcon icon={faArrowUpAZ}/>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => {handleSort(true, 'title', 'asc')}}>
                            Name: from A to Z <FontAwesomeIcon icon={faArrowDownAZ}/>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => {handleSort(true, 'price', 'asc')}}>
                            Price: Low to High <FontAwesomeIcon icon={faArrowDown19}/>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => {handleSort(true, 'price', 'desc')}}>
                            Price: High to Low <FontAwesomeIcon icon={faArrowUp19}/>
                        </Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className={cx('pro-container')}>
                    {product.map((result) => (
                        <NavLink className={cx('pro')} to={`/products/${result.slug}`} key={result._id}>
                            <img src={result.image} alt="" />
                            <div className={cx('des')}>
                                <span>Original</span>
                                <h4>{result.title}</h4>
                                <h4 className={cx('des-price')}>${result.price}</h4>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Product;