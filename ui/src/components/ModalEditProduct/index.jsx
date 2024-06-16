import { useEffect, useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import { toast } from 'react-toastify';

import * as productServices from '../../services/productServices';

function ModalEditProduct(props) {
    const {handleClose, show, dataProductEdit, handleUpdateTable} = props

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState([]);

    useEffect(() => {
        if(show) {
            setTitle(dataProductEdit.title)
            setPrice(dataProductEdit.price)
            setDescription(dataProductEdit.description)
            setId(dataProductEdit._id)
        }
    }, [dataProductEdit])

    const handleSaveProduct = async () => {
        let formdata = new FormData();
        formdata.append('_id', id)
        formdata.append('title', title)
        formdata.append('price', price)
        formdata.append('description', description)
        formdata.append('image', file)

        let res = await productServices.updateProduct(formdata);
        if (res && res.status === 200) {
            //success
            handleClose();
            setTitle('');
            setPrice(0);
            setDescription('');
            toast.success(res.data.message)
            handleUpdateTable(res.data.data)
        } else {
            toast.error("Product cannot be saved!")
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
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
                            <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
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

export default ModalEditProduct;