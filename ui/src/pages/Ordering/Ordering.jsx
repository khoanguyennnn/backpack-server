import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown , faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import * as orderServices from '../../services/orderServices';
import classNames from "classnames/bind";
import styles from './Ordering.module.scss'
import { baseImageURL } from '../../routes';

const cx = classNames.bind(styles);

function Ordering() {
    const [orderInfo, setOrderInfo] = useState([]);

    const [checked, setChecked] = useState([]);
    const [reRender, setReRender] = useState(false);

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
            let res = await orderServices.getAllOrder();
            setOrderInfo(res);
        }
        fetchApi()
    }, [reRender])

    const handleDeliveryConfirm = async (id) => {
        let res = await orderServices.deliveryConfirm(id);
        if(res && res.status === 200){
            setReRender(!reRender)
            toast.success('Confirm Delivery Successfully!')
        } else {
            toast.error('Cannot Confirm Information..')
        }
    }

    return (
        <>
            <div className={cx('wrapper')}>
                <div>
                    <h2>Order history</h2>
                    <p>Check the status of recent orders</p>
                    <Link to={`/dashboard`}>
                        <Button variant="dark">Dashboard</Button>
                    </Link>
                </div>
                {orderInfo.map((value) => (
                    <div className={cx('order-wrapper')} key={value._id}>
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
                                {value.status === "Shipping" && 
                                    <Button variant="primary" onClick={() => handleDeliveryConfirm(value._id)}>Delivery Confirm</Button>
                                }
                            </div>
                            <hr />
                            <div>
                                <div className={cx('order-detail')}>
                                    <div className={cx('product-info')}>
                                        Customer Information
                                        <div>
                                            <h3>Name: {value.user.name}</h3>
                                            <h3>User ID: {value.user._id}</h3>
                                            <h3>Email: {value.user.email}</h3>
                                        </div>
                                    </div>
                                    <div className={cx('product-price')}>
                                        <h3>Address: {value.user.address}</h3>
                                    </div>
                                    <div className={cx('dropdown-icon')} onClick={() => {handleCheck(value._id)}}>
                                        { checked.includes(value._id) ? 
                                            <FontAwesomeIcon icon={faCaretUp}/>
                                        :
                                            <FontAwesomeIcon icon={faCaretDown}/>
                                        }
                                    </div>
                                </div>
                                <hr />
                            </div>
                            { checked.includes(value._id) &&
                                value.products.map((value, index) => (
                                    <div key={index}>
                                        <div className={cx('order-detail')}>
                                            <div className={cx('product-info')}>
                                                <img className={cx('image')} src={baseImageURL+ value.product?.image} alt="" />
                                                <div className={cx('product-title')}>
                                                    <h4>{value.product?.title}</h4>
                                                    <h5>Quantity - {value?.quantity}</h5>
                                                </div>
                                            </div>
                                            <div className={cx('product-price')}>
                                                <h2>Price: $ {value.product?.price}</h2>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                ))
                            }    
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Ordering;