import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown , faCaretUp } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './History.module.scss';
import * as orderServices from '../../services/orderServices';
import { baseImageURL } from '../../routes';

const cx = classNames.bind(styles)

function History() {
    const [orderInfo, setOrderInfo] = useState([]);

    const [checked, setChecked] = useState([]);

    const handleCheck = (id) => {
        setChecked(prev => {
            const isChecked = checked.includes(id)
            if(isChecked) {
                return checked.filter(item => item !== id)
            } else {
                return [...prev, id]
            }
        })
    }

    useEffect(() => {
        const fetchApi = async () => {
            let res = await orderServices.getOrder();
            setOrderInfo(res)
        }
        fetchApi();
    },[])

    return (
        <div className={cx('wrapper')}>
           <div>
                <h2>Order history</h2>
                <p>Check the status of recent orders</p>
           </div>
           {!!orderInfo && orderInfo.map((value, index) => (
                <div className={cx('order-wrapper')} key={index}>
                        <div className={cx('order-table')}>
                            <div className={cx('order-info')}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Date Placed</th>
                                            <th>Total Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{value._id}</td>
                                            <td>{value.createdAt}</td>
                                            <td>$ {value.totalPrice}</td>
                                            <td>{value.status}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className={cx('dropdown-icon')} onClick={() => {handleCheck(value._id)}}>
                                    { checked.includes(value._id) ? 
                                        <FontAwesomeIcon icon={faCaretUp}/>
                                    :
                                        <FontAwesomeIcon icon={faCaretDown}/>
                                    }
                                </div>
                            </div>
                            <hr />
                            {checked.includes(value._id) && 
                            value.products.map((product,index) => (
                                <div key={index}>
                                    <div className={cx('order-detail')}>
                                        <div className={cx('product-info')}>
                                            <img className={cx('image')} src={baseImageURL+product.product.image} alt="" />
                                            <div className={cx('product-title')}>
                                                <h4>{product.product.title}</h4>
                                                <h5>Quantity - {product.quantity}</h5>
                                            </div>
                                        </div>
                                        <div className={cx('product-price')}>
                                            <h2>Price: $ {product.product.price}</h2>
                                        </div>
                                    </div>
                                    <hr />
                                </div>    
                            ))}
                        </div>
                </div>
            ))}
        </div>
    )
}

export default History