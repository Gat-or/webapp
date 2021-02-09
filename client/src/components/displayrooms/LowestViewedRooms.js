import React, { useState, useEffect } from 'react';
import RoomCards from './RoomCards';
import './RoomGrid.css';

const LowestViewedRooms = props => {
    const [listOfLowestViewedRooms, setListOfLowestViewedRooms] = useState([]);

    const getLowestViewedRoomsAPI = () => {
        fetch('/api/rooms/getLowestViewedRooms')
            .then(res => res.json())
            .then(res => setListOfLowestViewedRooms(res))
            .catch(err => err);
    }

    useEffect(() => {
        getLowestViewedRoomsAPI();
    }, [])

    return (
        <>
            <div className='default-rooms-grid'>
                <RoomCards listOfRooms={listOfLowestViewedRooms} />
            </div>
        </>
    )
}

export default LowestViewedRooms