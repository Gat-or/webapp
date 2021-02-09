import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
//import '../styles/RoomCards.css';

var video = {
    URL: ''
}

const VideoCards = props => {
    const [listOfVideos, setListOfVideos] = useState([]);

    useEffect(() => {
        setListOfVideos(props.listOfVideos)
    })

    const getVideoURL = e => {
        video.URL = e.currentTarget.id;
    }

    const myVideoCards = listOfVideos.map(video => {
        if (video.message) {
            return (<div className="youtube-error">
               Youtube search quota exceeded. Please copy and paste a youtube link to load a video or click the Twitch icon to search Twitch videos.
            </div>);
        }
        else if (video.id) {
            if (video.id.videoId) {
                return (<div className='video-card-container'>
                    <a id={`https://www.youtube.com/watch?v=` + video.id.videoId} class='video-thumbnail-link' href='#' onClick={e => getVideoURL(e)}>
                        <img className='video-thumbnail' src={`https://img.youtube.com/vi/` + `${video.id.videoId}` + `/mqdefault.jpg`} ></img>
                    </a>
                    <div className='video-title'>{video.snippet.title}</div>
                </div>)
            }
        } else if (video._id) {
            return (<div className='video-card-container'>
                <a id={`https://www.twitch.tv/` + video.channel.display_name} class='video-thumbnail-link' href='#' onClick={e => getVideoURL(e)}>
                    <img className='video-thumbnail' src={ `${video.preview.medium}`} ></img>
                </a>
                <div className='video-title'>{video.channel.display_name}</div>
            </div>)
        }
    });

    return (
        <>
            {myVideoCards}
        </>
    )
}

export { video };
export default VideoCards;