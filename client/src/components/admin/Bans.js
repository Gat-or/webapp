import React, { useState, useEffect } from 'react';
import { DropdownButton, Dropdown, Table, Pagination, Button } from 'react-bootstrap';
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

const Bans = props => {

    return (
        <>
            <div className='content-header-grid'>
                <div className='content-header-item'>
                <h3>Ban Log</h3>
                
                </div>
                
                <div className='content-header-item'>
                    <DropdownButton className='sort-by-button' id="dropdown-item-button" size='sm' variant='outline-info' title={"Sort by: Most Recent"}>
                    <Dropdown.Item >Oldest</Dropdown.Item>
                    <Dropdown.Item >Unbans</Dropdown.Item>
                    <Dropdown.Item >Bans</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            <Row >
                <Form inline style={{ marginLeft: '10px' }} >
                    <FormControl type="text" placeholder="Username or id" className="mr-sm-2" required/>

                    <Button type='submit' value='submit' variant="outline-primary">Search</Button>
                </Form>
            </Row>
            <ColoredLine color="black" />
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>id</th>
                <th>Username</th>
                <th>Profile Picture</th>
                <th>Status</th>
                <th>Options</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>5624</td>
                <td>Otto54</td>
                <td><img src="https://www.kolpaper.com/wp-content/uploads/2020/03/spiderman-wallpaper.jpg" alt="None" width="50" height="60"></img></td>
                <td>Banned</td>
                <td><Button variant="primary">Unban</Button></td>
                </tr>
                <tr>
                <td>2</td>
                <td>8546</td>
                <td>Thornton63</td>
                <td><img src="https://upload.wikimedia.org/wikipedia/en/c/cd/Thanos_Infinity_4.png" alt="None" width="50" height="60"></img></td>
                <td>Banned</td>
                <td><Button variant="primary">Unban</Button></td>
                </tr>
                <tr>
                <td>3</td>
                <td>1227</td>
                <td>Jim68</td>
                <td><img src="https://cms-tc.pbskids.org/global/show-icons/square-transparent/curious-george.png?mtime=20160720102031" alt="None" width="50" height="60"></img></td>
                <td>Banned</td>
                <td><Button variant="primary">Unban</Button></td>
                </tr>
                <tr>
                <td>4</td>
                <td>5462</td>
                <td>qq845</td>
                <td><img src="../images/dark.jpg" alt="None" width="50" height="60"></img></td>
                <td>Banned</td>
                <td><Button variant="primary">Unban</Button></td>
                </tr>
                <tr>
                <td>5</td>
                <td>1227</td>
                <td>Jim68</td>
                <td><img src="../images/dark.jpg" alt="None" width="50" height="60"></img></td>
                <td>Banned</td>
                <td><Button variant="primary">Unban</Button></td>
                </tr>
                <tr>
                <td>6</td>
                <td>7375</td>
                <td>Mick75</td>
                <td><img src="../images/dark.jpg" alt="None" width="50" height="60"></img></td>
                <td>Banned</td>
                <td><Button variant="primary">Unban</Button></td>
                </tr>
                <tr>
                <td>7</td>
                <td>2567</td>
                <td>Ashy</td>
                <td><img src="https://i.imgur.com/kP5UXdC.png" alt="None" width="50" height="60"></img></td>
                <td>Unbanned</td>
                <td><Button variant="danger">Ban</Button></td>
                </tr>
                <tr>
                <td>8</td>
                <td>7654</td>
                <td>Quarter66</td>
                <td><img src="../images/dark.jpg" alt="None" width="50" height="60"></img></td>
                <td>Banned</td>
                <td><Button variant="primary">Unban</Button></td>
                </tr>
                <tr>
                <td>9</td>
                <td>8653</td>
                <td>Em59</td>
                <td><img src="../images/dark.jpg" alt="None" width="50" height="60"></img></td>
                <td>Banned</td>
                <td><Button variant="primary">Unban</Button></td>
                </tr>
                <tr>
                <td>10</td>
                <td>4647</td>
                <td>Sticky</td>
                <td><img src="https://i.imgur.com/kP5UXdC.png" alt="None" width="50" height="60"></img></td>
                <td>Banned</td>
                <td><Button variant="primary">Unban</Button></td>
                </tr>
                
                </tbody>
                </Table>
                <br />
                <Pagination className='content-center'>
                <Pagination.First className='content-center'/>
                <Pagination.Prev className='content-center'/>
                <Pagination.Item className='content-center' active>{1}</Pagination.Item>
                <Pagination.Item className='content-center'>{2}</Pagination.Item>
                <Pagination.Item className='content-center'>{3}</Pagination.Item>
                <Pagination.Next className='content-center'/>
                <Pagination.Last className='content-center'/>
                </Pagination>

                
            

                    
            </>
        );
    }

export default Bans;