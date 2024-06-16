import { useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import { toast } from 'react-toastify';

import * as productServices from '../../services/productServices';

function ModalAddProduct(props) {
    const {handleClose, show, onSubmit} = props

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');

    const handleSaveProduct = async () => {
        let res = await productServices.storeProduct(title, price, description);
        if (res && res.status === 200) {
            //success
            onSubmit(res);
            handleClose();
            setTitle('');
            setPrice(0);
            setDescription('');
            toast.success("Product is created successfully")
        } else {
            toast.error("Product cannot be saved!")
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter title" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control 
                                type="number"  
                                placeholder="Enter price" 
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control 
                                size="lg" 
                                type='text' 
                                as="textarea" 
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>

                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={() => handleSaveProduct()}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddProduct;