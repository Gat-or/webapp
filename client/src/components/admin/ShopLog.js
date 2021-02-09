import React, { useState, useEffect } from 'react';
import { DropdownButton, Dropdown, Table, Pagination, Button, Badge } from 'react-bootstrap';
import { Row, Form, FormControl} from 'react-bootstrap';
import '../common/Main.css';

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2
        }}
    />
);

const ShopLog = props => {

    return (
        <>

                
                <div className='content-header-grid'>
                <div className='content-header-item'>
                <h3>Shop Log <Button variant="primary">Add Item</Button></h3>
                </div>
                <div className='content-header-item'>
                    <DropdownButton className='sort-by-button' id="dropdown-item-button" size='sm' variant='outline-info' title={"Sort by: Most Recent"}>
                    <Dropdown.Item >Oldest</Dropdown.Item>
                    <Dropdown.Item >Most Expensive</Dropdown.Item>
                    <Dropdown.Item >Least Expensive</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            <Row >
                <Form inline style={{ marginLeft: '10px' }} >
                    <FormControl type="text" placeholder="Item Name" className="mr-sm-2" required/>

                    <Button type='submit' value='submit' variant="outline-primary">Search</Button>
                </Form>
            </Row>
            <ColoredLine color="black" />
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Category</th>
                <th>Item Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Profile Picture Frame</td>
                <td>Gold Frame</td>
                <td><img src="https://i.imgur.com/1Jr296g.png" alt="None" width="50" height="60"></img></td>
                <td>100,000 <Badge pill variant="success">GP</Badge>{' '}</td>
                <td><Button variant="danger">Remove Item</Button></td>
                </tr>
                <tr>
                <td>2</td>
                <td>Profile Picture Frame</td>
                <td>Neon Pink Frame</td>
                <td><img src="https://i.imgur.com/bkdC8Gs.png" alt="None" width="50" height="60"></img></td>
                <td>10,000 <Badge pill variant="success">GP</Badge>{' '}</td>
                <td><Button variant="danger">Remove Item</Button></td>
                </tr>
                <tr>
                <td>3</td>
                <td>Profile Picture Frame</td>
                <td>Gearbox Frame</td>
                <td><img src="https://i.imgur.com/ObOU9ZJ.png" alt="None" width="50" height="60"></img></td>
                <td>5,000 <Badge pill variant="success">GP</Badge>{' '}</td>
                <td><Button variant="danger">Remove Item</Button></td>
                </tr>
                <tr>
                <td>4</td>
                <td>Profile Picture Frame</td>
                <td>Wood Frame</td>
                <td><img src="https://www.pngkey.com/png/full/372-3723871_avatar-img-the-queen-picture-frame.png" alt="None" width="50" height="60"></img></td>
                <td>1,000 <Badge pill variant="success">GP</Badge>{' '}</td>
                <td><Button variant="danger">Remove Item</Button></td>
                </tr>
                <tr>
                <td>5</td>
                <td>Room Background</td>
                <td>Black Room</td>
                <td><img src="https://i.imgur.com/wkVpNUO.png" alt="None" width="50" height="60"></img></td>
                <td>10,000 <Badge pill variant="success">GP</Badge>{' '}</td>
                <td><Button variant="danger">Remove Item</Button></td>
                </tr>
                <tr>
                <td>6</td>
                <td>Room Background</td>
                <td>Pink Room</td>
                <td><img src="https://i.imgur.com/oVBppcr.png" alt="None" width="50" height="60"></img></td>
                <td>5,000 <Badge pill variant="success">GP</Badge>{' '}</td>
                <td><Button variant="danger">Remove Item</Button></td>
                </tr>
                <tr>
                <td>7</td>
                <td>Room Background</td>
                <td>Red Room</td>
                <td><img src="https://i.imgur.com/2rFSyLu.png" alt="None" width="50" height="60"></img></td>
                <td>1,000 <Badge pill variant="success">GP</Badge>{' '}</td>
                <td><Button variant="danger">Remove Item</Button></td>
                </tr>
                <tr>
                <td>8</td>
                <td>Room Background</td>
                <td>Blue Room</td>
                <td><img src="https://i.imgur.com/Axz0bOg.png" alt="None" width="50" height="60"></img></td>
                <td>1,000 <Badge pill variant="success">GP</Badge>{' '}</td>
                <td><Button variant="danger">Remove Item</Button></td>
                </tr>
                </tbody>
                </Table>
                <br />
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

export default ShopLog;