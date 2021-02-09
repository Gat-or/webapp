import React, { Component, useState, useEffect, useRef } from 'react';
import './Chatroom.css';
import '../common/Tooltip.css';
import { Button } from 'react-bootstrap';
import { FaMicrophone, FaHeadphones, FaCircleNotch } from 'react-icons/fa';
import { io } from 'socket.io-client';


const Messages = ({ messages }) => {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);

    return (
        <div className="messagesWrapper">
            {messages.map(message => (
                <span key={message}>{message}</span>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

let usernameAssigned = false;
const Chatroom = props => {

    const [username, setUsername] = useState('');
    const [guestUsername, setGuestUsername] = useState('');
    const [listOfMessages, setMessages] = useState([]);
    const myFormRef = useRef(null);
    const socket = useRef(null);

    const getUsername = () => {
        fetch('/api/users/getLoginUsername')
            .then(res => res.json())
            .then((res) => {
                setUsername(res);
            })
            .catch(err => err);
    }

    useEffect(() => {
        //socket.current = io("http://ec2-54-219-202-42.us-west-1.compute.amazonaws.com/", {
        socket.current = io("http://localhost/", {
            path: '/api/socket.io/',
            transports: ['websocket']
        })
        getUsername();

        //when user connects
        socket.current.on('connect', () => {
            let roomId = props.roomId;

            //set username for room
            socket.current.emit("room", roomId, username);
        });

         //set guest username for room
         socket.current.on('guestUsername', guestUser => {
            console.log("GUEST USER NAME BEING SET to " + guestUser)
            if (!usernameAssigned) {
                setGuestUsername(guestUser);
                usernameAssigned = true;
            }
        });

         //update messages in chat
         socket.current.on('message', message => {
            setMessages(listOfMessages => [...listOfMessages, message]);
        });

       
        socket.current.on('reconnect_attempt', () => {
            socket.io.opts.transports = ['polling', 'websocket'];
        });

    }, [username])


    useEffect(() => {
        //socket.current = io("http://ec2-54-219-202-42.us-west-1.compute.amazonaws.com/", {
        socket.current = io.connect("http://localhost/", {
            path: '/api/socket.io/',
            transports: ['websocket']
        })
    }, []);

    const sendMessage = (e) => {
        let roomId = props.roomId;

        let user;

        //if user is logged in set user to username
        if (document.cookie.includes('cookieKey')) {
            user = username;
        }
        //else set user to guest username
        else {
            user = guestUsername;
        }
        let message = document.getElementById("chat-textarea").value;
        socket.current.emit("sendMessage", roomId,  user + " " + message);
        console.log(document.getElementById("chat-textarea").value);

        // clear text area after submit
        document.getElementById("chat-textarea").value = "";
    }

    const myMessages = listOfMessages.map(myMessage => {
        // let username = myMessage.replace(/ .*/,'');
        let index = myMessage.indexOf(" ");
        let username = myMessage.substr(0, index);
        let message = myMessage.substr(index + 1);

        return (
            <div className="full-message">
                <div className="username">{username}</div>
                <div className="message">{message}</div>
            </div>
        )
    });

    const onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            sendMessage(e);
        }
    }

    return (
        <>
            <div className="chat-container box">
                <div className="chat-header">Stream chat</div>

                <div className="chat-content">
                    <Messages messages={myMessages} />
                </div>

                <div className="bottom-chat">
                    <form className="chat-form" onSubmit={sendMessage} ref={myFormRef}>
                        <textarea id="chat-textarea" className="chat-textarea" maxLength="500"
                            autoComplete="off" type="text" placeholder="Send a message..." rows="1"
                            onKeyDown={onEnterPress}
                        >
                        </textarea>
                    </form>
                    <div className="chat-input-utilities">
                        <div className="chat-input-utilities-left display-flex">
                            <div className='chat-button-container'>
                                <div className="chat-utility-icon tooltip2" style={{ color: "#007bff" }}>
                                    <FaCircleNotch size={18} /> <span style={{ color: "black" }}>0</span>
                                    <span className="tooltiptext2">0 Gator Points</span>
                                </div>

                            </div>
                        </div>
                        <div className="chat-input-utilities-right display-flex">
                            <div className='chat-button-container'>
                                <FaMicrophone className="chat-utility-icon" size={18} />
                            </div>
                            <div className="send-button-container">
                                <Button className="sendMessageButton" size="sm" style={{ fontWeight: "500", marginLeft: "10px" }} onClick={sendMessage}>Chat</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Chatroom;