import React, { useState, useEffect } from 'react';
import RoomCards from './RoomCards';
import './RoomGrid.css';

const HighestViewedRooms = props => {
    const [listOfHighestViewedRooms, setListOfHighestViewedRooms] = useState([]);

    const getHighestViewedRoomsAPI = () => {
        fetch('/api/rooms/getHighestViewedRooms')
            .then(res => res.json())
            .then(res => setListOfHighestViewedRooms(res))
            .catch(err => err);
    }

    useEffect(() => {
        getHighestViewedRoomsAPI();
    }, [])

    return (
        <>
            <div className='default-rooms-grid'>
                <RoomCards listOfRooms={listOfHighestViewedRooms} />
            </div>
        </>
    )
}

export default HighestViewedRooms