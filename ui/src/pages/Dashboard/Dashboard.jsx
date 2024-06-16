import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames/bind';
import _ from 'lodash';

import * as productServices from '../../services/productServices';
import ModalAddProduct from '../../components/ModalAddProduct';
import ModalEditProduct from '../../components/ModalEditProduct';
import ModalDeleteProduct from '../../components/ModalDeleteProduct';
import styles from './Dashboard.module.scss';
import { useEffect, useState } from 'react';
import { baseImageURL } from '../../routes';

const cx = classNames.bind(styles);

function Dashboard () {
    const [products, setProducts] = useState([]);
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataProductEdit, setDataProductEdit] = useState({})

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataProductDelete, setDataProductDelete] = useState({})


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
        console.log(data);
        let cloneProducts = _.cloneDeep(products)
        let index = products.findIndex(product => product._id === data._id)
        console.log(index);
        cloneProducts[index] = data;
        setProducts(cloneProducts)
    }

    const handleRemoveFromModal = (data) => {
        let cloneProducts = _.cloneDeep(products)
        cloneProducts = cloneProducts.filter(item => item._id !== data._id)
        setProducts(cloneProducts)
    }

    const handleEditTable = (product) => {
        setDataProductEdit(product)
        setIsShowModalEdit(true)
    }

    const handleDeleteTable = (product) => {
        setIsShowModalDelete(true)
        setDataProductDelete(product)
    } 

    const handleClose = () => {
        setIsShowModalAddNew(false)
        setIsShowModalEdit(false)
        setIsShowModalDelete(false)
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
                                                <img className={cx('product-image')} src={baseImageURL+product.image} alt="" />
                                            </td>
                                            <td>{product.description}</td>
                                            <td>
                                                <Button variant="warning" onClick={() => {handleEditTable(product)}}>Edit</Button>
                                                <Button variant="danger" onClick={() => {handleDeleteTable(product)}}>Delete</Button>
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
                handleClose = {handleClose}
                onSubmit = {getData}
            />
            <ModalEditProduct
                show = {isShowModalEdit}
                handleClose = {handleClose}
                dataProductEdit= {dataProductEdit}
                handleUpdateTable = {handleUpdateTable}
            />
            <ModalDeleteProduct
                show = {isShowModalDelete}
                handleClose = {handleClose}
                dataProductDelete = {dataProductDelete}
                handleRemoveFromModal = {handleRemoveFromModal}
            />
        </>
    )
}

export default Dashboard;