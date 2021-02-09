import React, { Component, useState, useEffect } from 'react';
import Footer from '../common/Footer';
import '../common/Main.css';
import MyNavBar from '../common/MyNavBar';
import {Col, Image, Card, CardDeck} from 'react-bootstrap';

const Aboutus = props => {
    const [testResponse, setTestResponse] = useState('no response');

    
    return(
        <div className='main'>
                   <MyNavBar />
                  <div className='main-content-container'>
                   <header class="bg-primary text-center py-5 mb-4">
                  <div class="container">
                 <h1 class="font-weight-light text-white" >
                  Software Engineering
                 </h1>
                 <h2 class="font-weight-light text-white">
                  CSC 648-04 Fall 20
                 </h2>
                <h3 class="font-weight-light text-white">
                Team 06
                </h3>
               </div>
              </header>
                <h1 align="center">About us</h1>
                <h2 align="center">We are a group of fourth year CS students at SFSU.</h2> 
                <h2 align="center">gat.or is our senior capstone project.</h2>
                <br />
                <body>
                    <CardDeck style={{justifyContent: "center", textAlign: "center"}}>
                            <Col md="3">
                            <Card style={{ width: "22rem" }} className="box">
                                <Card.Header>
                                        Back-end Lead
                                </Card.Header>
                                <Card.Img variant="top" src="\images\mike.jpg" alt="Failed to Load"  />
                                <Card.Body>
                                    <Card.Title>Michael Morales</Card.Title>
                                </Card.Body>
                            </Card>
                            </Col>
                            <Col md="3">
                            <Card style={{ width: "22rem" }} className="box">
                                <Card.Header>Team Lead</Card.Header>
                                <Card.Img variant="top" src="\images\git.jpg" alt="Failed to Load" />
                                <Card.Body>
                                    <Card.Title>
                                    Miguel Mellado
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                            </Col>
                            <Col md="3">
                            <Card style={{ width: "22rem" }} className="box">
                                <Card.Header>
                                Front-end lead
                                </Card.Header>
                                <Card.Img variant="top" src="\images\JasonProfilePic.jpg" alt="Failed to Load"  />
                                <Card.Body>
                                <Card.Title>Jason Llanos</Card.Title>
                                
                                </Card.Body>
                            </Card>
                            </Col>
                        </CardDeck>
                        <br/>
                        <CardDeck style={{justifyContent: "center", textAlign: "center"}}>
                            <Col md="3">
                            <Card style={{ width: "22rem" }} className="box">
                                <Card.Header>
                                Database Lead
                                </Card.Header>
                                <Card.Img variant="top" src="\images\face.jpg" alt="Failed to Load"  />
                                <Card.Body>
                                    <Card.Title>Weyman Leung</Card.Title>
                                </Card.Body>
                            </Card>
                            </Col>
                            <Col md="3">
                            <Card style={{ width: "22rem" }} className="box">
                                <Card.Header>Github master</Card.Header>
                                <Card.Img variant="top" src="\images\tyler.jpg" alt="Failed to Load" />
                                <Card.Body>
                                    <Card.Title>
                                    Tyler Hoh
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                            </Col>
                            <Col md="3">
                            <Card style={{ width: "22rem" }} className="box">
                                <Card.Header>
                                Documentation Master
                                </Card.Header>
                                <Card.Img variant="top" src="\images\default-profile-pic.png" alt="Failed to Load"  height="300"/>
                                <Card.Body>
                                <Card.Title>Chenyang Zhang</Card.Title>
                                
                                </Card.Body>
                            </Card>
                            </Col>
                            </CardDeck>
                            <br/>
                    </body>
            </div>
            <Footer/>
            </div>
    )
}

export default Aboutus;