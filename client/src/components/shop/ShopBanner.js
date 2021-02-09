import React from 'react';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import '../common/Main.css';
import './ShopBanner.css';

const ShopBanner = props => {

    return (
        <>
            <section className='banner-grid'>
                <h1 className='header'>Welcome to The Shop</h1>
                <div className='banner-button-columns'>                        
                            <Button href="#frames" className='button-style' variant='outline-light' size='lg' >Frames</Button>
                            <Button href="#backgrounds" className='button-style' variant='light' size='lg' >Backgrounds</Button>
                        </div>           
            </section>
            
        </>
    )
}

export default ShopBanner;