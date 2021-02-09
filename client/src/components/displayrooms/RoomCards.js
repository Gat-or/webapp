import React, { useState, useEffect } from 'react';
import './RoomCards.css';
import '../common/Main.css';

const RoomCards = props => {
    const [listOfRooms, setListOfRooms] = useState([]);

    useEffect(() => {
        setListOfRooms(props.listOfRooms)
    })

    const elapsedTime = created => {
        'use strict';
        var milliSeconds = Date.parse(created);
        const since = milliSeconds, // Saturday, 08-Apr-17 21:00:00 UTC // 1491685200000
            elapsed = (new Date().getTime() - since) / 1000;

        if (elapsed >= 0) {
            const diff = {};

            diff.days = Math.floor(elapsed / 86400);
            diff.hours = Math.floor(elapsed / 3600 % 24);
            diff.minutes = Math.floor(elapsed / 60 % 60);
            diff.seconds = Math.floor(elapsed % 60);

            let message = `Over ${diff.days}d ${diff.hours}h ${diff.minutes}m ${diff.seconds}s.`;
            message = message.replace(/(?:0. )+/, '');
            //   alert(message);
            if (diff.days > 0) {
                if (diff.days == 1 ){
                    return diff.days + " day ago"
                }
                else {
                    return diff.days + " days ago"
                }
            }
            // for hours (atleast 1hr)
            else if (diff.days < 1 && diff.hours >=1) {
                // alert('under 1 day!')
                if (diff.hours == 1 ){
                    return diff.hours + " hour ago"
                }
                else {
                    return diff.hours + " hours ago"
                }
            }
            // for 0 day 0 hours 1>=minutes (atleast 1 min)
            else if (diff.days < 1 && diff.hours < 1 && diff.minutes >=1) {
                if (diff.minutes == 1 ){
                    return diff.minutes + " minute ago"
                }
                else {
                    return diff.minutes + " minutes ago"
                }
            }
            // for 0 days 0 hours 0 min (atleast less than 1 min)
            else {
                return "just started!"
            }
        }
        else {
            //alert('Elapsed time lesser than 0, i.e. specified datetime is still in the future.');
            return "future";
        }
    };

    const myRoomCards = listOfRooms.map(room =>
        <div className='card-container'>
            <a class='room-thumbnail-link' href={`/room/${room.id}`}>
                <div className='room-thumbnail-container'>
                    <img className='room-thumbnail' src={`${room.thumbnail}`} ></img>
                    <div className='live-label'>LIVE</div>
                    <div className='viewer-count-label'>{`${room.viewer_count} viewers`}</div>
                </div>
            </a>
            <div className='card-info'>
                <div className='card-info-container'>
                    <div>
                        <h6 className='room-title'>{room.description}</h6>
                        <div className='room-username'>{room.username}</div>
                        <div className='room-video-type'>{room.video_type} &#8226; {elapsedTime(room.created)}</div>
                    </div>
                </div>
                
            </div>
        </div>
        
    )

    return (
        <>
            
            {myRoomCards}
            
            
        </>
    )
}

export default RoomCards;