import React, { Component } from 'react';
import Footer from '../common/Footer';
import AdminBanner from './AdminBanner';
import Bans from './Bans';
import ShopLog from './ShopLog';
import MyNavBar from '../common/MyNavBar';

const Admin = props => {
    return(
        <div className='main'>
            <MyNavBar />
            <div className='main-content-container'>
                <AdminBanner />
                <br />  {/**Gave the bottom some room */}
                <section id="ban"><Bans /></section>
                <section id="shop"><ShopLog /></section>
                
                <Footer />
            </div>
        </div>
    )
}

export default Admin;