import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import RoomCards from './RoomCards';
import './RoomGrid.css';

const RecentRooms = props => {
    const [listOfRecentRooms, setListOfRecentRooms] = useState([]);

    const getRecentRoomsAPI = () => {
        fetch('/api/rooms/getRecentRooms')
            .then(res => res.json())
            .then(res => setListOfRecentRooms(res))
            .catch(err => err);
    }

    useEffect(() => {
        getRecentRoomsAPI();
    }, [])

    return (
        <>
            <div className='default-rooms-grid'>
                <RoomCards listOfRooms={listOfRecentRooms} />
            </div>
        </>
    )
}

export default RecentRooms
