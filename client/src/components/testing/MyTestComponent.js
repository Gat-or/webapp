
import React, { Component, useState, useEffect } from "react";

import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const YourComponent = props => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            
            <div>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Launch vertically centered modal
                </Button>

                <RoomInviteModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </div>
    );

};

const RoomInviteModal = (props) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const [tooltipVal, setToolTipVal] = useState('Copy to clipboard');
    let textArea;

    const copyCodeToClipboard = () => {
        const el = textArea
        el.select()
        document.execCommand("copy")
        setCopySuccess(true)
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
                        value="Send this URL to your friends"
                        style={{ width: '75%' }}
                    />
                    <div className='tooltip2'>
                            <button 
                                onClick={() => copyCodeToClipboard()}
                                onMouseOut={() => outFunc()}
                            >
                                Copy
                                <span className='tooltiptext2'>
                                    {tooltipVal}
                                </span>
                            </button>
                        
                    </div>
                    
                </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

export default YourComponent;