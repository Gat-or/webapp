import React, { Component, useState, useEffect } from 'react';
import Footer from '../common/Footer';
import Frames from './Frames';
import Backgrounds from './Backgrounds';
import '../common/Main.css';
import ShopBanner from './ShopBanner';
import MyNavBar from '../common/MyNavBar';

const Shop = props => {
    const [testResponse, setTestResponse] = useState('no response');

    
    return(
        <div className='main'>
            <MyNavBar />
            <div className='main-content-container'>
                <ShopBanner />
                <br />
                <section id="frames"><Frames /></section>
                <section id="backgrounds"><Backgrounds /></section>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Shop;