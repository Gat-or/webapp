import React, { Component } from 'react';
import Footer from '../common/Footer';
import BrowseBanner from './BrowseBanner';
import RoomBrowser from '../displayrooms/RoomBrowser';
import MyNavBar from '../common/MyNavBar';

const Browse = props => {
    return(
        <div>
            <div className='main'>
                <MyNavBar />
                <div className='main-content-container'>
                    <BrowseBanner />
                    <br />  {/**Gave the bottom some room */}
                    <RoomBrowser />
                </div>
            </div>
            <div className="bottom-fixed"><Footer /></div>
        </div>
    )
}

export default Browse;