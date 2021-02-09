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

const Frames = props => {

    return (
        <>
            <div className='content-header-grid'>
                <div className='content-header-item'>
                <h3><Badge variant="danger">New!</Badge>{' '}Profile Picture Frames:</h3>
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
                    <FormControl type="text" placeholder="Frame name" className="mr-sm-2" required/>

                    <Button type='submit' value='submit' variant="outline-primary">Search</Button>
                </Form>
            </Row>
                
                <ColoredLine color="black" />
                
                <CardDeck style={{justifyContent: "center"}}>
                    <Col md="3">
                    <Card style={{ width: "22rem" }} className="box">
                        <Card.Img variant="top" src="/images/golden_frame_anim.png" alt="Failed to Load" fluid  />
                        <Card.Body>
                        <Card.Title>Gold Frame</Card.Title>
                        <Card.Text>
                            This frame is for those who like to show that they've been around
                            for a while.  Official price is 100,000 Gator Points.
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <Button variant="success">Add to Cart</Button>
                        <br />
                        <small>Price: 100,000 <Badge pill variant="success">GP</Badge>{' '}</small>
                        </Card.Footer>
                    </Card>
                    </Col>
                    <Col md="3">
                    <Card style={{ width: "22rem" }} className="box">
                        <Card.Img variant="top" src="/images/pink-frame.png" alt="Failed to Load" fluid  />
                        <Card.Body>
                        <Card.Title>Neon Pink Frame</Card.Title>
                        <Card.Text>
                            A neon pink frame for all!  Who says real men can't wear pink.
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
                        <Card.Img variant="top" src="/images/gearbox.png" alt="Failed to Load" fluid  />
                        <Card.Body>
                        <Card.Title>Gearbox Frame</Card.Title>
                        <Card.Text>
                            This frame is for those who are always there to lend a helping hand when it comes to
                            fixing something.  Gear on!
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
                        <Card.Img variant="top" src="/images/wood-frame.png" alt="Failed to Load" fluid  />
                        <Card.Body>
                        <Card.Title>Wood Frame</Card.Title>
                        <Card.Text>
                            A more economic choice for those who are newer to the gat.or.
                            This frame is sure to keep you looking stylish.
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
                    <Pagination.Item className='content-center'>{2}</Pagination.Item>
                    <Pagination.Item className='content-center'>{3}</Pagination.Item>
                    <Pagination.Next className='content-center'/>
                    <Pagination.Last className='content-center'/>
                    </Pagination>
                    <br />
                    



            

            
                
                
        </>
    );
}

export default Frames;