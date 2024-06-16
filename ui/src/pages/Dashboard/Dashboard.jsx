import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames/bind';
import _ from 'lodash';

import * as productServices from '../../services/productServices';
import ModalAddProduct from '../../components/ModalAddProduct';
import ModalEditProduct from '../../components/ModalEditProduct';
import styles from './Dashboard.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Dashboard () {
    const [products, setProducts] = useState([]);
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataProductEdit, setDataProductEdit] = useState({})

    useEffect(() => {
        const fetchApi = async () => {
            const res = await productServices.getProduct();
            setProducts(res);
        }
        fetchApi();
    }, [])

    // Re-render components
    const getData = (data) => {
        let newProduct = data.data.data;
        setProducts(oldProducts => [...oldProducts, newProduct])
    };

    const handleUpdateTable = (data) => {
        let cloneProducts = _.cloneDeep(products)
        let index = products.findIndex(product => product._id === data._id)
        cloneProducts[index] = data;
        setProducts(cloneProducts)
    }

    const handleEditTable = (product) => {
        setDataProductEdit(product)
        setIsShowModalEdit(true)
    }

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('title')}>
                        <h2>Product Managing</h2>
                        <Button variant="dark" onClick={() => {setIsShowModalAddNew(true)}}>Add new Product</Button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.length > 0 &&
                                products.map((product, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{product.title}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <img className={cx('product-image')} src={product.image} alt="" />
                                            </td>
                                            <td>{product.description}</td>
                                            <td>
                                                <Button variant="warning" onClick={() => {handleEditTable(product)}}>Edit</Button>
                                                <Button variant="danger">Delete</Button>
                                            </td>
                                        </tr>
                                    )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
            <ModalAddProduct
                show = {isShowModalAddNew}
                handleClose = {() => {setIsShowModalAddNew(false)}}
                onSubmit = {getData}
            />
            <ModalEditProduct
                show = {isShowModalEdit}
                handleClose = {() => {setIsShowModalEdit(false)}}
                dataProductEdit= {dataProductEdit}
                handleUpdateTable = {handleUpdateTable}
            />
        </>
    )
}

export default Dashboard;