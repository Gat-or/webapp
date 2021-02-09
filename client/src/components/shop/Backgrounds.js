import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardDeck, Col } from 'react-bootstrap';
import { DropdownButton, Dropdown, Pagination } from 'react-bootstrap';
import { Row, Form, FormControl} from 'react-bootstrap';

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2
        }}
    />
);

const Backgrounds = props => {

    return (
        <>
                    



                    <div className='content-header-grid'>
                <div className='content-header-item'>
                <h3>Room Backgrounds:</h3>
                </div>
                <div className='content-header-item'>
                    <DropdownButton className='sort-by-button' id="dropdown-item-button" size='sm' variant='outline-info' title={"Sort by: Price (Highest)"}>
                    <Dropdown.Item >Price (lowest)</Dropdown.Item>
                    <Dropdown.Item >Date added (oldest)</Dropdown.Item>
                    <Dropdown.Item >Date added (newest)</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            <Row >
                <Form inline style={{ marginLeft: '10px' }} >
                    <FormControl type="text" placeholder="Background name" className="mr-sm-2" required/>

                    <Button type='submit' value='submit' variant="outline-primary">Search</Button>
                </Form>
            </Row>
                
                <ColoredLine color="black" />
                <CardDeck style={{justifyContent: "center"}}>
                    <Col md="3">
                    <Card style={{ width: "22rem" }} className="box">
                        <Card.Img variant="top" src="/images/dark.png" alt="Failed to Load" fluid  />
                        <Card.Body>
                        <Card.Title>Dark Room</Card.Title>
                        <Card.Text>
                        This dark room is for those who love to have the lights down low.
                            Enjoy your videos in the dark.
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <Button variant="success">Add to Cart</Button>
                        <br />
                        <small>Price: 10,000 <Badge pill variant="success">GP</Badge>{' '}</small>
                        </Card.Footer>
                    </Card>
                    </Col>
                    <Col md="3">
                    <Card style={{ width: "22rem" }} className="box">
                        <Card.Img variant="top" src="/images/pink.png" alt="Failed to Load" fluid  />
                        <Card.Body>
                        <Card.Title>Pink Room</Card.Title>
                        <Card.Text>
                        A pink room background for those who have to have the cutest room of them all.
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <Button variant="success">Add to Cart</Button>
                        <br />
                        <small>Price: 5,000 <Badge pill variant="success">GP</Badge>{' '}</small>
                        </Card.Footer>
                    </Card>
                    </Col>
                    <Col md="3">
                    <Card style={{ width: "22rem" }} className="box">
                        <Card.Img variant="top" src="/images/red.png" alt="Failed to Load" fluid  />
                        <Card.Body>
                        <Card.Title>Red Room</Card.Title>
                        <Card.Text>
                        A red room background for those who love the color of love.
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <Button variant="success">Add to Cart</Button>
                        <br />
                        <small>Price: 1,000 <Badge pill variant="success">GP</Badge>{' '}</small>
                        </Card.Footer>
                    </Card>
                    </Col>
                    <Col md="3">
                    <Card style={{ width: "22rem" }} className="box">
                        <Card.Img variant="top" src="/images/blue.png" alt="Failed to Load" fluid  />
                        <Card.Body>
                        <Card.Title>Blue Room</Card.Title>
                        <Card.Text>
                        A blue room for when you're feeling blue.  Goes great for those who are new to gat.or.
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <Button variant="success">Add to Cart</Button>
                        <br />
                        <small>Price: 1,000 <Badge pill variant="success">GP</Badge>{' '}</small>
                        </Card.Footer>
                    </Card>
                    </Col>
                    
                    </CardDeck>
                    <Pagination className='content-center'>
                    <Pagination.First className='content-center'/>
                    <Pagination.Prev className='content-center'/>
                    <Pagination.Item className='content-center' active>{1}</Pagination.Item>
                    <Pagination.Next className='content-center'/>
                    <Pagination.Last className='content-center'/>
                    </Pagination>
                    
            

            
                
                
        </>
    );
}

export default Backgrounds;