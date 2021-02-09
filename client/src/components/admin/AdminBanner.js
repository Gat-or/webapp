import React from 'react';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import '../common/Main.css';
import './AdminBanner.css';

const AdminBanner = props => {

    return (
        <>
            <div className='banner-wrapper-div'>
                <section className='alternate-banner'>
                        <h1>Admin Ban and Shop Settings</h1>
                        <div className='banner-button-columns'>                        
                            <Button href="#ban" className='button-style' variant='outline-light' size='lg' >Ban</Button>
                            <Button href="#shop" className='button-style' variant='light' size='lg' >Shop</Button>
                        </div>
                    
                </section>
            </div>
            
        </>
    )
}

export default AdminBanner;