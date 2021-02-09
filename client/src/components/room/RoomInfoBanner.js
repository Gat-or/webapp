import React, { useEffect, useState, useRef } from 'react';
import './RoomInfoBanner.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './RoomInviteModal.css';
//import { video } from './VideoSearchResults'
import { io } from 'socket.io-client';
const RoomInfoBanner = props => {
    const [roomInfo, setRoomInfo] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [videoTitle, setVideoTitle] = useState('')
    const fetchRoomById = () => {
        // fetch room api by id 
        let roomId = props.roomId;
        fetch('/api/rooms/getRoomById/' + roomId)
            .then(res => res.json())
            .then(res => setRoomInfo(res))
            .catch(err => err);
    };
    const socket = useRef();
        
    useEffect(() => {
        //socket.current = io("http://ec2-54-219-202-42.us-west-1.compute.amazonaws.com/", {
        socket.current = io("http://localhost/", {
            path: '/api/socket.io/',
            transports: ['websocket']
        })

        socket.current.on('connect', () => {
            let roomId = props.roomId;
            socket.current.emit("roomInfoBanner", roomId);
        });

        socket.current.on('reconnect_attempt', () => {
            socket.current.io.opts.transports = ['polling', 'websocket'];
        });
        
        //update video title
        socket.current.on('videoTitle', videoTitle => {
            if(videoTitle != null) {
                setVideoTitle(videoTitle);
            }
        });
        
        fetchRoomById();
    }, []);

    return (
        <>
            <div className='room-info-banner-wrapper'>
                <div className='room-info-banner-container'>
                    <div className='profile-pic-container'>
                        <img className='default-profile-pic' src='/images/default-profile-pic.png' alt='profilepic' />
                    </div>
                    <div className='room-info-section'>
                        <div className='room-info-top-row-grid'>
                            <div>
                                <p className='room-host-name'>{roomInfo.username}</p>
                                <p className='room-video-name'>{`playing: ${videoTitle}`}</p>
                                <p className='room-description'>{roomInfo.description}</p>
                            </div>
                            <div className='room-info-invite-section'>
                                <Button className='invite-button' variant='success' onClick={() => setModalShow(true)}>Invite people</Button>
                                <RoomInviteModal
                                    show={modalShow}
                                    roompageURL={props.roompageURL}
                                    onHide={() => setModalShow(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const RoomInviteModal = (props) => {
   // const [copySuccess, setCopySuccess] = useState(false);
    const [tooltipVal, setToolTipVal] = useState('Copy to clipboard');
    let textArea;

    const copyCodeToClipboard = () => {
        const el = textArea
        el.select()
        document.execCommand("copy")
        //setCopySuccess(true)
        setToolTipVal('Copied');
    };

    const outFunc = () => {
        setToolTipVal('Copy to clipboard'); 
    };

    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
              <div className='inivte-modal-title'>
                INVITE FRIENDS
              </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Send room invite link to a friend</p>
            <div>
                <div>
                    <input
                        ref={(textarea) => textArea = textarea}
                        value={props.roompageURL}
                        style={{ width: '75%' }}
                    />
                    <div className='tooltip2'>
                        <Button
                            onClick={() => copyCodeToClipboard()}
                            onMouseOut={() => outFunc()}
                        >
                            Copy
                            <span className='tooltiptext2'>
                                {tooltipVal}
                            </span>
                        </Button>
                    </div>
                    
                </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

export default RoomInfoBanner;