import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player'
import VideoSearchResults from './VideoSearchResults';
import { video } from './VideoSearchResults'

import './VideoCards.css'
import './VideoPlayer.css'
import './LoadVideoModal.css'
import { FaPlaneDeparture, FaVolumeMute } from 'react-icons/fa';
import { io } from 'socket.io-client';

// material-ui 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import FullScreenIcon from '@material-ui/icons/Fullscreen';
import VolumeOff from '@material-ui/icons/VolumeOff';

// import react-player controls
import { PlayerIcon } from 'react-player-controls';

const useStyles = makeStyles({
    // style for the player wrapper
    // style for the controls wrapper
    // i don't think we need it
    controlsWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 1,
    },

    controlIcons: {
        color: "#777",
        fontSize: 50,
        transform: "scale(0.9)",
        "@&:hover": {
            color: "white",
            transform: "scale(1)"
        },
    },

    bottomIcons: {
        color: '#999',
        "@&:hover": {
            color: "white",
        },
    },

    volumeSlider: {
        width: 100,
    },
});

function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

let host = false;
const VideoPlayer = props => {
    let roomId;
    const youtubeApiKey = "AIzaSyDRF9HxHgDSYMpdnS2Jys3wuaQVfLD0aR0";
    const twitchApiKey = "bb14zhwdgl9pygmriojk8n0rbn3ux7";
    const [show, setShow] = useState(false);
    const [tempVideoURL, setTempVideoURL] = useState('');
    const [videoURL, setVideoURL] = useState(video.URL);
    const [videoTitle, setVideoTitle] = useState(video.title);
    const [videoMuted, setVideoMuted] = useState(true);
    const [playing, setPlaying] = useState(true);
    const [firstTimeLoadVideo, setFirstTimeLoadVideo] = useState(true);
    const [listOfVideoSearchResults, setListOfVideoSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchPlatform, setSearchPlatform] = useState("Youtube");
    const [searchPlatformLogo, setSearchPlatformLogo] = useState("/images/yt_logo_rgb_light.jpg");
    const [roomInfo, setRoomInfo] = useState({});
    //const socket = socketIOClient(ENDPOINT);
    const [viewers, setViewers] = useState(0);
    const player = React.useRef(null);
    const [username, setUsername] = useState('');
    //const [host, setHost] = useState(false);

    // overlays
    const [unmuteOverlay, setUnmuteOverlay] = useState(true);

    // volume styles and states
    const classes = useStyles();
    const [volume, setVolume] = useState(0.5);
    const [previousVolume, setPreviousVolume] = useState(0.5);

    const socket = useRef();

    const fetchRoomById = () => {
        // fetch room api by id 
        let roomId = props.roomId;
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

    const checkHost = () => {
        if (roomInfo.username === username) {
            host = true;
        }
    }

    const updateViewers = (currentViewers) => {
        let roomId = props.roomId;
        console.log("VIEWERS " + currentViewers)
        const data = { roomid: roomId, viewers: currentViewers }
        fetch('/api/rooms/updateViewers', {
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

    useEffect(() => {
        //socket.current = io("http://ec2-54-219-202-42.us-west-1.compute.amazonaws.com/", {
        socket.current = io("http://localhost/", {
            path: '/api/socket.io/',
            transports: ['websocket'],
        })

        //when user connects set video stats
        socket.current.on('connect', () => {
            let roomId = props.roomId;
            getUsername();
            checkHost();
            console.log("I JUST ENTERED THE ROOM, HOST: " + username)
            socket.current.emit("video", roomId);
        });

        //update video link
        socket.current.on('videoLink', videoLink => {
            setVideoURL(videoLink);
            setPlaying(true);
            setShow(false);

        });

        //update video title
        socket.current.on('videoTitle', videoTitle => {
            console.log("TITLEEEEE" + videoTitle);
            video.title = videoTitle;
        });

        //update video start time for new users entering the room
        socket.current.on('startVideoTime', () => {
            let roomId = props.roomId;
            if (host) {
                console.log(player.current.getCurrentTime())
                socket.current.emit("setVideoTime", roomId, player.current.getCurrentTime());
            }
            else {
                console.log("SEEKING: NOT THE HOST")
            }
        });

        //seek to video time
        socket.current.on('videoTime', time => {
            if (!host) {
                console.log("SEEKING TO: " + time)
                if (typeof player.current.seekTo(time) !== 'undefined') {
                    player.current.seekTo(time);
                }
            }
            else {
                console.log("IM THE HOST")
            }
        })

        //set pause on or off
        socket.current.on('pause', pause => {

            //if(!host) {
            if (pause) {
                setPlaying(false);
            }
            else {
                if (host) {
                    let roomId = props.roomId;
                    socket.current.emit("setVideoTime", roomId, player.current.getCurrentTime());
                }
                setPlaying(true);
            }
            // }

        })

        //update viewers in the room
        socket.current.on('viewers', viewers => {
            setViewers(viewers);
            updateViewers(viewers);
        })

        fetchRoomById();

    }, [username]);

    const loadVideo = () => {
        console.log(video.title);
        host = true;
        //setHost(true)
        if (video.URL != '') {
            setVideoURL(video.URL);
            setVideoMuted(false);
            let roomId = props.roomId;
            socket.current.emit("setVideoLink", roomId, video.URL);
            socket.current.emit("setVideoTitle", roomId, video.title);
            handleClose();
        }
    };

    const pauseVideo = () => {
        if (roomInfo.username == username) {
            let roomId = props.roomId;
            socket.current.emit("setPause", roomId, true);
        }
    }

    const playVideo = () => {
        if (roomInfo.username == username) {
            let roomId = props.roomId;
            socket.current.emit("setPause", roomId, false);
        }
    }

    const handleClose = () => setShow(false);

    const handleShow = () => {
        host = true;
        setShow(true); console.log(firstTimeLoadVideo);
        if (firstTimeLoadVideo) {
            setFirstTimeLoadVideo(false)
            youtubeMostPopularVideosAPI();
        }
    };

    const handleURLChange = e => {
        console.log("Handling change")
        video.URL = e.target.value;
        setTempVideoURL(video.URL);
    };

    const handleSearch = e => {
        setSearchTerm(e.target.value);
    };


    const search = () => {
        console.log("roomid:" + roomId);
        if (searchPlatform == "Youtube") {
            youtubeSearchAPI();
        }
        else if (searchPlatform == "Twitch") {
            twitchSearchApi();
        }
    }

    const youtubeMostPopularVideosAPI = () => {
        fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&key=" + youtubeApiKey + "&maxResults=50&fields=items")
            .then(res => res.json())
            .then((res) => {
                if (res.error) {
                    setListOfVideoSearchResults(res.error.errors);
                }
                else {
                    setListOfVideoSearchResults(res.items);
                }
            })
            .catch(err => err);
    }

    const youtubeSearchAPI = () => {
        fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" + searchTerm + "&type=video&key=" + youtubeApiKey + "&maxResults=50&fields=items/id(videoId),items/snippet(title),items/snippet(thumbnails)")
            .then(res => res.json())
            .then((res) => {
                if (res.error) {
                    setListOfVideoSearchResults(res.error.errors);
                }
                else {
                    setListOfVideoSearchResults(res.items);
                }
            })
            .catch(err => err);
    }

    const twitchSearchApi = () => {
        if (searchTerm != '') {
            console.log("twitch search" + props.roomId)
            fetch("https://api.twitch.tv/kraken/search/streams?limit=50&query=" + searchTerm, { headers: { 'client-id': twitchApiKey, 'accept': 'application/vnd.twitchtv.v5+json' } })
                .then(res => res.json())
                .then((res) => {
                    console.log(res.streams);
                    setListOfVideoSearchResults(res.streams);
                })
                .catch(err => err);
        }
    }

    const handleUnmuteOverlay = () => {
        // document.getElementById("unmute-video-overlay").style.display = "none";
        setUnmuteOverlay(false);
        setVideoMuted(false)
    }

    const handleVolumeChange = (e, newValue) => {
        setVolume(parseFloat(newValue / 100));
        setVideoMuted(newValue === 0 ? true : false);
        setUnmuteOverlay(newValue === 0 ? false : null);
    }

    const handleVolumeSeekDown = (e, newValue) => {
        setVolume(parseFloat(newValue / 100));
        setVideoMuted(newValue === 0 ? true : false);
    }

    const handleMute = () => {
        setVideoMuted(!videoMuted); // toggles mute state
        setUnmuteOverlay(false);
    }




    return (
        <div className='video-player-container'>
            <div className="react-player-wrapper">
                <ReactPlayer className='react-player' ref={player} url={videoURL} width='100%' height='100%' muted={videoMuted} playsinline={true} playing={playing} controls={true}
                    //onStart = {() => setVideoMuted(false)}
                    onPause={pauseVideo}
                    onPlay={playVideo}
                    onProgress={() => { }}
                    volume={volume}
                    config={{
                        youtube: {
                            playerVars: { autoplay: 1 }
                        },
                        options: {
                            parent: ['ec2-54-219-202-42.us-west-1.compute.amazonaws.com', 'localhost']
                        }
                    }} />
                {videoMuted && unmuteOverlay ?
                    <div className='unmute-video-overlay' id='unmute-video-overlay' onClick={handleUnmuteOverlay}>
                        {console.log('video is muted')}
                        <div classname="overlay-content" id='overlay-content'>
                            <div style={{ textAlign: "center" }}>
                                <FaVolumeMute size={75} />
                            </div>
                            <div>
                                Click to unmute
                                </div>
                        </div>
                    </div>
                    : null}
                {roomInfo.username != username ?
                    <div>
                        <div classname="nonhost-video-overlay" id="nonhost-video-overlay">
                        </div>
                    </div>
                    : null}
            </div>
            <div className="video-bar">
                <div className="mediaControls">
                    {roomInfo.username == username ?
                        <div className="load-video-button-wrapper">
                            <Button className="load-video-button" onClick={handleShow}><span>Load Video</span></Button>
                        </div>
                        :
                        <Grid container direction='row' alignItems='center' justify='space-between' style={{ padding: 0 }} >
                            <Grid item style={{ padding: 0 }}>
                                <Grid container alignItems='center' direction='row'>
                                    <IconButton onClick={handleMute} className={classes.bottomIcons} >
                                        {videoMuted ? <VolumeOff fontSize="inherit" style={{ padding: 0 }} /> : <VolumeUpIcon fontSize="inherit" style={{ padding: 0 }} />}
                                    </IconButton>

                                    <Slider
                                        min={0}
                                        max={100}
                                        value={volume * 100}
                                        className={classes.volumeSlider}
                                        onChange={handleVolumeChange}
                                        onChangeCommitted={handleVolumeSeekDown}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                    <div className="viewers-wrapper">
                        <div className="viewers">Watching now {viewers}</div>
                    </div>
                </div>
            </div>
            <div className="load-video-modal-container">
                <Modal dialogClassName="load-video-modal-dialog" contentClassName="load-video-modal" centered show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <a href="#" onClick={() => { setSearchPlatform("Youtube"); setSearchPlatformLogo("/images/yt_logo_rgb_light.jpg") }}>
                            <img className="youtube-logo" src="/images/yt_logo_rgb_light.jpg"></img>
                        </a>
                        <a href="#" onClick={() => { setSearchPlatform("Twitch"); setSearchPlatformLogo("/images/TwitchExtrudedWordmarkPurple.jpg") }}>
                            <img className="facebook-logo" src="/images/TwitchExtrudedWordmarkPurple.jpg"></img>
                        </a>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="video-form-group">
                                <img className="search-logo" src={searchPlatformLogo}></img>
                                <Form.Control id="search-input" type="text" value={searchTerm} onChange={handleSearch} placeholder="Search Video Name..." required />
                                <Button className="search-button" variant="primary" onClick={search}>
                                    Search
                            </Button>
                                <Form.Control id="video-url-input" type="text" value={video.URL} onChange={handleURLChange} placeholder="Enter Video URL..." required />
                                <Button className="load-button" variant="primary" onClick={loadVideo}>
                                    Load Video
                            </Button>
                            </Form.Group>
                        </Form>
                        <div className='alt-video-search-results-container' >
                            <VideoSearchResults listOfVideos={listOfVideoSearchResults} />
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

export default VideoPlayer;