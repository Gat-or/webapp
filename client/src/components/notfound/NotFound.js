import React, { Component, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Footer from '../common/Footer'; 
import MyNavBar from '../common/MyNavBar';
import '../common/Main.css';

const NotFound = props => {
    return (
        <div>       
            <div className='main'>
            <MyNavBar />
            <br />
            <div >
                <h1 className="presentation-highlights">Page Not Found</h1>
                <br />
            </div>
            <div className="presentation-highlights" style={{ marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center'}}>
                <img  src="https://cdn.discordapp.com/attachments/749169261234094091/778167304638169118/tenor.gif" alt="Italian Trulli"></img>
                <br />
                <br />
                <p>The page you requested could not be found. Please check the URL and try again, or click the button below to return to our home page.</p>
                <Button href="/" variant="primary">Home</Button>{' '}
            </div>
            

            </div>
            <div className="bottom-fixed"><Footer /></div>
        </div>

    )
}

export default NotFound;