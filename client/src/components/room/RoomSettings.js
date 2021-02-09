import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const RoomSettings = props => {

    const [roomSettingsShow, setRoomSettingsShow] = useState(false);
    const [publicRoom, setPublicRoom] = useState(true);
    const [privateRoom, setPrivateRoom] = useState(false);
    const handleRoomSettingsShow = () => { setRoomSettingsShow(true) };
    const handleRoomSettingsClose = () => setRoomSettingsShow(false);
    const [roomInfo, setRoomInfo] = useState({});
    let roomId = props.roomId;
    const fetchRoomById = () => {
        // fetch room api by id 
        fetch('/api/rooms/getRoomById/' + roomId)
            .then(res => res.json())
            .then(res => setRoomInfo(res))
            .catch(err => err);
    };

    useEffect(() => {
        fetchRoomById();
    }, []);

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
        <div>
            <a href="#" className="room-settings-button" onClick={handleRoomSettingsShow}><span title="Room Settings"><img src="/images/room-settings-button.jpg"></img></span></a>
            <Modal show={roomSettingsShow} onHide={handleRoomSettingsClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Room Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form method="POST" action="/api/rooms/updateRoomSettings" enctype="application/x-www-form-urlencoded">
                        <Form.Group className="form-room-type" controlId="form-room-type-control-id">
                            <Form.Control type="hidden" name="roomid" id="roomid" value={roomId}/>
                            <Form.Label className="public-form-label">Public</Form.Label>
                            <Form.Check type="radio" className="public-form-checkbox" name="public" value={publicRoom} checked={publicRoom} onChange={e => makeRoomPublic(e)}></Form.Check>
                            <Form.Label className="private-form-label">Private</Form.Label>
                            <Form.Check type="radio" classname="private-form-checkbox" name="private" value={privateRoom} checked={privateRoom} onChange={e => makeRoomPrivate(e)}></Form.Check>
                        </Form.Group>
                        <Form.Group controlId="form-room-name">
                            <Form.Label>Room Name: { roomInfo.description }</Form.Label>
                            <Form.Control type="text" name="roomdescription" placeholder="Change room description..." />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleRoomSettingsClose}>
                            Change Room Settings
                         </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
/*
<form id="video-card-form" class="video-card-form" method="POST" action="/api/rooms/updateRoomThumbnail" enctype="application/x-www-form-urlencoded">
                        <input type="hidden" name="roomid" id="roomid" value={roomId}/>
                        <input type="hidden" name="thumbnail" id="thumbnail" value={img}/>
                        <button type="submit" id={url} class={title} name={img} onClick={e => setVideoStats(e)}>
                            <img className='video-thumbnail' src={`${img}`} ></img>
                        </button>
                    </form>
                </div>*/

export default RoomSettings;