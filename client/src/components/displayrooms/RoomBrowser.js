import React, { useState, useEffect } from 'react';
import { DropdownButton, Dropdown, Table, Pagination, Button } from 'react-bootstrap';
import { Row, Form, FormControl} from 'react-bootstrap';
import RecentRooms from './RecentRooms';
import OldestRooms from './OldestRooms';
import HighestViewedRooms from './HighestViewedRooms';
import '../common/Main.css';

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 0.5
        }}
    />
);

const RoomBrowser = props => {
    const [oldIsActive, setOldIsActive] = useState(false);
    const [newIsActive, setNewIsActive] = useState(true);
    const [popularIsActive, setPopularIsActive] = useState(false);
    const [sortByValue, setSortByValue] = useState('Newest Rooms');

    const handleInput = val => {
        if (val == 'oldest') {
            setOldIsActive(true);
            setNewIsActive(false);
            setPopularIsActive(false);
            setSortByValue('Oldest Rooms');
        } 
        else if (val == 'most popular') {
            setOldIsActive(false);
            setNewIsActive(false);
            setPopularIsActive(true);
            setSortByValue('Most Popular Rooms');
        }
        else {
            setOldIsActive(false);
            setNewIsActive(true);
            setPopularIsActive(false);
            setSortByValue('Newest Rooms');
        }
    }

    const choosDisplay = () => {
        let display;
        if (newIsActive){
            display = <RecentRooms/>
        }
        else if (oldIsActive) {
            display = <OldestRooms/>
        }
        else {
            display = <HighestViewedRooms/>
        }
        return (
            display
        )
    };

    return (
        <>
            <div className='content-header-grid'>
                <div className='content-header-item'>
                <h3>Room Finder</h3>
                
                </div>
                
                <div className='content-header-item'>
                    <DropdownButton className='sort-by-button' id="dropdown-item-button" size='sm' variant='outline-info' title={"Sort by: " + sortByValue}>
                        <Dropdown.Item as="button" onClick={() => handleInput('most popular')} active={popularIsActive} >Most popular</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleInput('newest')} active={newIsActive} >Date added (newest)</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleInput('oldest')} active={oldIsActive} >Date added (oldest)</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            <Row >
                <Form inline style={{ marginLeft: '10px' }} >
                    <FormControl type="text" placeholder="Room Information" className="mr-sm-2" required/>

                    <Button type='submit' value='submit' variant="outline-primary">Search</Button>
                </Form>
            </Row>
            <ColoredLine color="light-grey" />
            {choosDisplay()}
            
                    



            

            
                
                
        </>
    );
}

export default RoomBrowser;