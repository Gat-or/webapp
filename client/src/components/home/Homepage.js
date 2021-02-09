import React, { Component, useState, useEffect } from 'react';
import Footer from '../common/Footer';
import AllRooms from '../displayrooms/AllRooms';
import HomeBanner from './HomeBanner';
import MyNavBar from '../common/MyNavBar';
import '../common/Main.css';

const Homepage = props => {
    const [testResponse, setTestResponse] = useState('no response');

    const testApi = () => {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => setTestResponse(res))
            .catch(err => err);
    }

    useEffect(() => {
        testApi(); // testAPI is not used in Homepage. It's just to test the connection to the api
    }, []) // [] is needed after api calls to avoid infinite fetch calls

    return(
        <div>       
            <div className='main'>
            <MyNavBar />
            <div className='main-content-container'>
                <HomeBanner />
                <AllRooms />
            </div>
        </div>
        <div className="bottom-fixed"><Footer /></div></div>
    )
}

export default Homepage;