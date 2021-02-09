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
                <h1 className="presentation-highlights">Terms of Service</h1>
                <br />
            </div>
            <div className="presentation-highlights" style={{ marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center'}}>
            <embed src="https://docs.google.com/document/d/16ic3X9wsLM_vI-R9cLvdggSLziBK4peznSZAtlt2fK4/edit?usp=sharing" width="1300px" height="1500px" />
                
            </div>
            

            </div>
            <div className="bottom-fixed"><Footer /></div>
        </div>

    )
}

export default NotFound;