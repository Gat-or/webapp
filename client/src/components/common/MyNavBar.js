import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, FormControl, NavDropdown, Form, Modal, Col, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { FaUserCircle, FaUserFriends } from 'react-icons/fa';
import UserLogin from '../common/UserLoginModal.js';



function CreatePopUp(props) {
    const [publicRoom, setPublicRoom] = useState(true);
    const [privateRoom, setPrivateRoom] = useState(false);
    const makeRoomPrivate = e => {
        if (publicRoom && !privateRoom) {
            setPublicRoom(false);
            setPrivateRoom(true);
        }
    };

    const makeRoomPublic = e => {
        if (privateRoom && !publicRoom) {
            setPrivateRoom(false)
            setPublicRoom(true);
        }
    };


    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>
                <Modal.Title className="presentation-highlights">
                    Create your own room
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <h3 className="presentation-highlights">Make it Public?</h3>
                <p>
                    <br />

                    <Form id="create-room-form" method="POST" action="/api/rooms/createRoom" enctype="application/x-www-form-urlencoded">
                        {/* <Form.Row style={{ marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center' }}>
                            <Form.Check inline type="radio" label="Public" name="formHorizontalRadios" id="formHorizontalRadios1" style={{ padding: '10px' }} />
                            <Form.Check inline type="radio" label="Private" name="formHorizontalRadios" id="formHorizontalRadios2" style={{ padding: '10px' }} />
                        </Form.Row>*/}
                        <Form.Row style={{ marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center' }}>
                            <Form.Check inline type="radio" label="Public" className="public-form-checkbox" name="public" value={publicRoom} checked={publicRoom} onChange={e => makeRoomPublic(e)}></Form.Check>
                            <Form.Check inline type="radio" label="Private" classname="private-form-checkbox" name="private" value={privateRoom} checked={privateRoom} onChange={e => makeRoomPrivate(e)}></Form.Check>
                        </Form.Row>
                        <div className="presentation-highlights"><small >Let anyone join your room or limit it to the people you invite</small></div>
                        <Form.Group style={{ marginTop: '15px' }} controlId="form-room-name">
                            <Form.Control className="room_description" id="room_description" type="text" placeholder="Enter a room name..." name="description" required />
                        </Form.Group>
                        <div className="presentation-highlights"><small >An example of a room name would be "Hanging out and watching music videos" </small></div>
                        <br/>
                        
                        <Button type="submit" variant="outline-primary" className="presentation-highlights">Create Room</Button>{' '}
                        <small className="presentation-highlights">By clicking Create Room, you are indicating that you have read and acknowledge the <a className="tos-link" href="/tos">Terms of Service</a> and <a className="tos-link" href="/tos">Privacy Notice</a>.</small>
                        
                    </Form>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


const MyNavBar = props => {

    const [searchTerm1, setSearchTerm1] = useState('');
    const [title, setTitle] = useState('All')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showSignupModal, setModalShow] = useState(false);
    const closeModal = () => setModalShow(false);
    const showModal = () => setModalShow(true);

    const [modalShow, setCreate] = React.useState(false);

    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

    const handleChange = e => {
        setSearchTerm1(e.target.value);
    };

    const handleSubmit = e => {
        window.location.assign('/search/' + searchTerm1 + '/' + title);
        e.preventDefault();
    };



    const logout = (e) => {

        fetch('/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: '',
        })
            //.then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                window.location.href = data.url;
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const [state, setState] = useState({
        showLoginModal: false,
        formType: "login",
    });
    
    let closeLoginModal = () => { setState({ showLoginModal: false }) };


    return (
        <>
            {/* responsive collapsable navbar */}
            <Navbar bg="dark" variant='dark' expand="lg" className="mr-auto"  >
                <Navbar.Brand href="/">gat.or</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/browse">Browse</Nav.Link>
                        {document.cookie.includes('cookieKey') ?
                            <Nav.Link onClick={() => setCreate(true)}>Start room</Nav.Link>
                            : null}

                    </Nav>
                    <Nav className="mr-auto">
                        <NavDropdown title={"Video type: " + title} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => setTitle("YouTube")}>YouTube</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setTitle("Twitch")}>Twitch</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setTitle("All")}>All</NavDropdown.Item>
                        </NavDropdown>
                        <Form inline onSubmit={handleSubmit}>
                            <FormControl type="text" value={searchTerm1} onChange={handleChange} placeholder="Room name or user" className="mr-sm-2" required />
                            <Button type="submit" value="submit" variant="outline-primary">Search</Button>
                        </Form>
                    </Nav>

                    {document.cookie.includes('cookieKey') ?
                        <Nav classname="nav-right-side">
                            {console.log(`user is signed in`)}
                            <Nav.Link>
                                <div>
                                    <FaUserFriends size={23}></FaUserFriends>
                                </div>
                            </Nav.Link>
                            <Nav.Link onClick={() => setUserIsLoggedIn(false), e => logout(e)} action="/api/users/logout">Log out</Nav.Link>
                            <Nav.Link>
                                <div classname="user-icon-container">
                                    <FaUserCircle size={23}></FaUserCircle>
                                </div>
                            </Nav.Link>
                        </Nav>
                        :
                        <Nav classname="nav-right-side">
                            {console.log('user is signed off')}
                            <Nav.Link onClick={() => { setState({ showLoginModal: true, formType: "login" }) }} >Login</Nav.Link>
                            <Nav.Link onClick={() => { setState({ showLoginModal: true, formType: "signup" }) }} >Sign up</Nav.Link>

                            <UserLogin
                                show={state.showLoginModal}
                                onHide={closeLoginModal}
                                formType={state.formType}
                            />
                        </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>

            {/* login popup */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Log in to your account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form method="POST" action="/api/users/login" enctype="application/x-www-form-urlencoded">
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="username" required />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Sign in
                         </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Signup popup */}
            <Modal show={showSignupModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign Up
                    </Modal.Title>
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
                        <Button type="submit" variant="primary">
                            Sign Up
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <CreatePopUp show={modalShow} onHide={() => setCreate(false)} />
        </>
    )
};

export default MyNavBar;
