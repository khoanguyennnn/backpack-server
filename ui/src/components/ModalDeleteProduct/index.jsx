import { useEffect, useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import { toast } from 'react-toastify';

import * as productServices from '../../services/productServices';

function ModalDeleteProduct(props) {
    const {handleClose, show, dataProductDelete, handleRemoveFromModal} = props

    const handleDeleteProduct = async (id) => {
        let res = await productServices.deleteProduct(id);
        if (res && res.status === 200) {
            handleRemoveFromModal(dataProductDelete)
            handleClose()
            toast.success(res.data)
        } else {
            toast.error('Cannot delete product')
            handleClose()
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    Do you want to delete this product?
                    <br />
                    Product name: <b>{dataProductDelete.title}</b>
                    <br />
                    Product price: <b>$ {dataProductDelete.price}</b>
                    <br />
                    Product ID: <b>{dataProductDelete._id}</b>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={() => {handleDeleteProduct(dataProductDelete._id)}}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDeleteProduct;