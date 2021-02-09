import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import RoomCards from './RoomCards';
import './RoomGrid.css';

const OldestRooms = props => {
    const [test, setTest] = useState('test');
    const [listOfOldestRooms, setListOfOldestRooms] = useState([]);

    const getOldestRoomsApi = () => {
        fetch('/api/rooms/getOldestRooms')
            .then(res => res.json())
            .then(res => setListOfOldestRooms(res))
            .catch(err => err);
    }

    useEffect(() => {
        getOldestRoomsApi();
    }, [])

    return (
        <>
            <div className='default-rooms-grid'>
                <RoomCards listOfRooms={listOfOldestRooms} />
            </div>
        </>
    )
}

export default OldestRooms;
