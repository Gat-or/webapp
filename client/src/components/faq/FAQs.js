import React, {useContext, useState, useEffect} from 'react';
import { Card, Accordion, AccordionContext, useAccordionToggle } from 'react-bootstrap';
import MyNavBar from '../common/MyNavBar';
import './FAQs.css'
import Footer from '../common/Footer';



const FAQs = props => {
    const [testResponse, setTestResponse] = useState('no response');

    
    function ContextAwareToggle({ children, eventKey, callback }) {
        const currentEventKey = useContext(AccordionContext);
      
        const decoratedOnClick = useAccordionToggle(
          eventKey,
          () => callback && callback(eventKey),
        );
      
        const isCurrentEventKey = currentEventKey === eventKey;
      
        return (
            
            <Accordion.Toggle as={Card.Header} eventKey = {eventKey} style={{cursor: "pointer"}}>
            {children}
        <h3 style={{textalign: "right", float: "right"}}>{isCurrentEventKey ? '[-]' : '[+]'}</h3>

          </Accordion.Toggle>
        );
      }
    

    return (
        <div>
        <div>
            <MyNavBar />
            <div class="container " >
                <h1 class="div-padding">Frequently Asked Questions: </h1>
                <div class="div-padding">
                    <Accordion defaultActiveKey="0">
                        <Card >
                            <ContextAwareToggle as={Card.Header} eventKey="0" >
                                <h3 style={{textalign: "left", float: "left"}} >What is gat.or?</h3>
                            </ContextAwareToggle>
                            <Accordion.Collapse eventKey="0" >
                                <Card.Body>
                                    <p>gat.or is a video streaming website that allows people to watch videos together at the same time.</p>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>

                <div class="div-padding" >

                    <Accordion defaultActiveKey="0" class="accordion">
                        <Card class="accordion card">
                            <ContextAwareToggle eventKey="1" >
                                <h3 style={{textalign: "left", float: "left"}} >Room Related Questions</h3>
                            </ContextAwareToggle>
                            <Accordion.Collapse eventKey="1" >
                                <Card.Body>
                                    <h5>How do I create a room?</h5>
                                    <p>You can create a room by click on "start room" located on the top left of the page and on the home page.</p>

                                    <h5>How do I join a room?</h5>
                                    <p>You can join a room by clicking on the video thumbnails on the homepage or in the browse room page</p>

                                    <h5>What is the maximum number of people in a room?</h5>
                                    <p>Rooms hosted by guests are limited to 10 people in a room, whereas registered hosts get 25 people in a room.</p>

                                    <h5>Can I talk to others through text and voice chat?</h5>
                                    <p>Yes! We support chatrooms as well as voice chat.</p>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>

                <div class="div-padding">
                    <Accordion defaultActiveKey="1">
                        <Card class="accordion">
                            <ContextAwareToggle eventKey="2" >
                                <h3 style={{textalign: "left", float: "left"}} >Website Related Questions:</h3>
                            </ContextAwareToggle>
                            <Accordion.Collapse eventKey="2" >
                                <Card.Body>
                                    <h5>What videos are supported?</h5>
                                    <p>Youtube and Twitch videos are supported at the moment.</p>

                                    <h5>What browsers are supported?</h5>
                                    <p>Google Chrome, Mozilla Firefox, and Microsoft Edge are supported at the moment.</p>

                                    <h5>Which countries are allowed to use gat.or?</h5>
                                    <p>All countries are allowed to use gat.or</p>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>

                </div>

                <div class="div-padding">
                    <Accordion defaultActiveKey="0">
                        <Card >
                            <ContextAwareToggle eventKey="3" >
                                <h3 style={{textalign: "left", float: "left"}} >How do I contact support?</h3>
                            </ContextAwareToggle>
                            <Accordion.Collapse eventKey="3" >
                                <Card.Body>
                                    <h5>Email customer support</h5>
                                    <p>You can reach out to us by contacting our email at null@gmail.com</p>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </div>
        </div>
        <div className="bottom-fixed"
        style = {{ width:"100%",bottom:-50, position:"relative"}}
        ><Footer /></div>
        </div>
    )
}

export default FAQs;
