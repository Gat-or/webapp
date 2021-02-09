import React, { Component, useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import Chatroom from './Chatroom';
import RoomInfoBanner from './RoomInfoBanner';
import MyNavBar from '../common/MyNavBar';
import RoomSettings from './RoomSettings';
import './Roompage.css';
import { host } from './VideoPlayer';

const Roompage = props => {

    const [roomInfo, setRoomInfo] = useState({});
    const [username, setUsername] = useState('');

    const fetchRoomById = () => {
        // fetch room api by id 
        let roomId = window.location.pathname.slice(6);
        let pos = roomId.indexOf('/');
        if (pos !== -1) {
            roomId = roomId.slice(0, pos);
        }
        fetch('/api/rooms/getRoomById/' + roomId)
            .then(res => res.json())
            .then(res => setRoomInfo(res))
            .catch(err => err);
    };

    const getUsername = () => {
        fetch('/api/users/getLoginUsername')
            .then(res => res.json())
            .then((res) => {
                setUsername(res);
            })
            .catch(err => err);
    }

    useEffect(() => {
        getUsername();
        fetchRoomById();
        window.scrollTo(0, 0)
    }, []);
    

    return (
        <div className='roompage-root-container'>
            <MyNavBar />
            <div className='room-content-container'>
                <div className='roompage-left-side' >
                    <VideoPlayer roompageURL={window.location.href} roomId={props.match.params.roomId} />
                    <div className="room-info">
                        {roomInfo.username == username ?
                            <RoomSettings roompageURL={window.location.href} roomId={props.match.params.roomId} />
                            : null}
                        <RoomInfoBanner roompageURL={window.location.href} roomId={props.match.params.roomId} />
                    </div>
                </div>
                <div className='roompage-right-side'>
                    <Chatroom roompageURL={window.location.href} roomId={props.match.params.roomId} />
                </div>
            </div>

        </div>
    )
}

export default Roompage;