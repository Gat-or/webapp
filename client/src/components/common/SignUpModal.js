import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../common/Main.css';
import '../admin/AdminBanner.css';

const SignUp = props => {

    const [showSignupModal, setModalShow] = useState(false);
    const closeModal = () => setModalShow(false);
    const showModal = () => setModalShow(true);

    return (
        <div>
            <div className='banner-button-columns'> 
            <Button className='button-style' variant='outline-light' size='lg' onClick={showModal}>Sign Up</Button>
            </div>
            <Modal show={showSignupModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form method="POST" action="/api/users/signup" enctype="application/x-www-form-urlencoded">
                        <Form.Group controlID='formBasicUsername'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter username" name="username" required />
                        </Form.Group>
                        <Form.Group controlID='formBasicEmail'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" required />
                        </Form.Group>
                        <Form.Group controlID='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" required />
                        </Form.Group>
                        <Button type="submit" variant="primary">Sign Up</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default SignUp;
