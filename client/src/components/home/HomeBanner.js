import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SignUp from '../common/SignUpModal';
import '../common/Main.css';
import './HomeBanner.css';
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
                        <br />
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

const HomeBanner = props => {

    const [modalShow, setCreate] = React.useState(false);
    const [state, setState] = useState({
        showLoginModal: false,
        formType: "login",
    });

    let closeLoginModal = () => { setState({ showLoginModal: false }) };


    return (
        <>
            <div className='banner-wrapper-div'>
                <section className='alternate-banner'>
                        <h1 className="presentation-highlights">Stream videos, <strong>together.</strong></h1>
                      
                        <div className='banner-button-columns' className="presentation-highlights">                        
                        {document.cookie.includes('cookieKey') ?
                            <Button className='button-style' variant='outline-light' size='lg' onClick={() => setCreate(true)}>Start room</Button>
                            :
                            //  <SignUp />
                            <>
                                <Button className='button-style' variant='outline-light' size='lg' onClick={() => { setState({ showLoginModal: true, formType: "signup" }) }}>Sign up</Button>
                                <UserLogin
                                    show={state.showLoginModal}
                                    onHide={closeLoginModal}
                                    formType={state.formType}
                                />
                            </>

                        }
                        
                        <Button href="/FAQs" className='button-style' variant='light' size='lg' >Learn More</Button>
                        <br></br>
                        {document.cookie.includes('cookieKey') ? <small> Get started by starting your own room, clicking on a room below, or search for one above.</small> : <small>Get started by signing up, clicking on a room below, or search for one above.</small>}
                        
                    </div>
                    <h4 className="presentation-highlights">Gat.or let’s you watch videos from your favorite platform with your friends, <strong>synchronously.</strong> 
                    </h4>
                    
                </section>
            </div>
            <CreatePopUp show={modalShow} onHide={() => setCreate(false)} />
        </>
    )
}

export default HomeBanner;