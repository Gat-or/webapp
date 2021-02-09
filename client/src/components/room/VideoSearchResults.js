import React, { useState, useEffect, useRef } from 'react';
import { Button, FormControl, NavDropdown, Form, Image } from 'react-bootstrap';
import { io } from 'socket.io-client';
var video = {
    URL: '',
    title: '',
    img: '',
    type: ''
}

const VideoSearchResults = props => {
    const [listOfVideos, setListOfVideoSearchResults] = useState([]);
    const socket = useRef();

    useEffect(() => {
        setListOfVideoSearchResults(props.listOfVideos)
    })

    useEffect(() => {
        //socket.current = io("http://ec2-54-219-202-42.us-west-1.compute.amazonaws.com/", {
        socket.current = io("http://localhost/", {
            path: '/api/socket.io/',
            transports: ['websocket']
        })
        
    },[])

    let roomId = window.location.pathname.slice(6);
    let pos = roomId.indexOf('/');
    if (pos !== -1) {
        roomId = roomId.slice(0, pos);
    }

    const updateTitle = (title) => {
        const data = { roomid: roomId, title: title }
        fetch('/api/rooms/updateRoomTitle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const updateVideoType = (videoType) => {
        const data = { roomid: roomId, videoType: videoType }
        fetch('/api/rooms/updateVideoType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const setVideoStats = e => {
        video.URL = e.currentTarget.id;
        video.title = e.currentTarget.className;
        video.img = e.currentTarget.name;
        let domain = video.URL.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0];
        if (domain == "youtube.com") {
            video.type = "youtube"
        }
        else if (domain == "twitch.tv") {
            video.type = "twitch";
        }
        updateVideoType(video.type);
        updateTitle(video.title);
        socket.current.emit("setVideoLink", roomId, video.URL);
        socket.current.emit("setVideoTitle", roomId, video.title);

    }

    const videoSearchResults = listOfVideos.map(searchResults => {
        let url, img, title;
        let roomId = window.location.pathname.slice(6);
        let pos = roomId.indexOf('/');
        if (pos !== -1) {
            roomId = roomId.slice(0, pos);
        }

        if (!searchResults.message) {
            //if youtube api
            if (searchResults.id) {
                //if youtube search api
                if (searchResults.id.videoId) {
                    url = `https://www.youtube.com/watch?v=` + searchResults.id.videoId;
                    img = searchResults.snippet.thumbnails.medium.url;
                    title = searchResults.snippet.title;
                } //else youtube most popular api
                else if (searchResults.kind) {
                    url = `https://www.youtube.com/watch?v=` + searchResults.id;
                    img = searchResults.snippet.thumbnails.medium.url;
                    title = searchResults.snippet.title;
                }
            } // else if twitch api
            else if (searchResults._id) {
                url = searchResults.channel.url;
                img = searchResults.preview.medium;
                title = searchResults.channel.display_name;
            }
            return (<div className='video-card-container'>
                <div className="video-thumbnail-container">

                    <Form id="video-card-form" class="video-card-form" method="POST" action="/api/rooms/updateRoomThumbnail" enctype="application/x-www-form-urlencoded">
                        <Form.Control type="hidden" name="roomid" id="roomid" value={roomId} />
                        <Form.Control type="hidden" name="thumbnail" id="thumbnail" value={img} />
                        <button type="submit" id={url} className={title} name={img} onClick={e => setVideoStats(e)}>
                            <Image className='video-thumbnail' src={`${img}`} ></Image>
                        </button>
                    </Form>
                </div>
                <div className='video-title'>{title}</div>
            </div>)
        } //else youtube quota api error
        else {
            return (<div className="youtube-error">
                Youtube search quota exceeded. Please copy and paste a youtube link to load a video or click the Twitch icon to search Twitch videos.
            </div>);
        }
    });

    return (
        <>
            {videoSearchResults}
        </>
    )
}

export { video };
export default VideoSearchResults;