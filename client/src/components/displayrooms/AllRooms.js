import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import RecentRooms from './RecentRooms';
import OldestRooms from './OldestRooms';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './AllRooms.css';
import HighestViewedRooms from './HighestViewedRooms';

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 0.5
        }}
    />
);

const AllRooms = props => {
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
                    <h3>{sortByValue}:</h3>
                </div>
                <div className='content-header-item'>
                    <DropdownButton className='sort-by-button' id="dropdown-item-button" size='sm' variant='outline-info' title={"Sort by: " + sortByValue}>
                        <Dropdown.Item as="button" onClick={() => handleInput('most popular')} active={popularIsActive} >Most popular</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleInput('newest')} active={newIsActive} >Date added (newest)</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleInput('oldest')} active={oldIsActive} >Date added (oldest)</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            <ColoredLine color="light-grey" />

            {choosDisplay()}

            {/* {newIsActive ? 
                <RecentRooms />
            : 
                <OldestRooms />
            } */}
            
            <div class="separator">
                <div class="line"></div>
                
                <h4><Button variant="outline-primary" href="/browse">More Rooms</Button>{' '}</h4>
                <div class="line"></div>
            </div>
                
                
        </>
    );
}

export default AllRooms;