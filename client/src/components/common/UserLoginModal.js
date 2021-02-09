import React, { useEffect, useState } from 'react';
import { Modal, Form, FormControl, Button, Navbar, Nav, ModalBody, Alert } from 'react-bootstrap';
import './UserLoginModal.css';
import './Main.css';

const LoginForm = () => {
    return (
        <>
            <ModalBody>
                <Form method="POST" action="/api/users/login" enctype="application/x-www-form-urlencoded">
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" name="username" required />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" required />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit" style={{ width: "100%" }}>
                        Log in
                    </Button>
                </Form>
            </ModalBody>

        </>

    )
}

const SignUpForm = () => {
    return (
        <>
            <ModalBody>
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
                    <div className="presentation-highlights">
                        <small >By clicking Sign Up, you are indicating that you have read and acknowledge the <a className="tos-link" href="/tos">Terms of Service</a> and <a className="tos-link" href="/tos">Privacy Notice</a>.</small>
                    </div>
                    <br />
                    <Button type="submit" variant="primary" style={{ width: "100%" }}>Sign Up</Button>
                </Form>
            </ModalBody>

        </>
    )
}

const UserLogin = props => {

    const [state, setState] = useState({
        formType: "login", 
    });

    useEffect(() => {
        setState({ formType: props.formType });
    }, [props.formType])

    const handleFormRender = () => {
            if (state.formType == "login") {
                return <LoginForm />
            }
            if (state.formType == "signup") {
                return <SignUpForm />
            }

    }

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className="form-type-container">
                        <span className={state.formType == 'login' ? "form-type underline" : "form-type"} id="login" onClick={() => { setState({ formType: "login" }) }}>Log in</span>
                        <span className={state.formType == 'signup' ? "form-type underline" : "form-type"} id="signup" onClick={() => { setState({ formType: "signup" }) }}>Sign up</span>
                    </div>

                </Modal.Title>
            </Modal.Header>

            {handleFormRender()}
        </Modal>
    );
}

export default UserLogin;
