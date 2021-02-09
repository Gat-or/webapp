import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import RoomCards from '../displayrooms/RoomCards';
import MyNavBar from '../common/MyNavBar';
import '../common/Main.css';
import '../displayrooms/RoomGrid.css';


const SearchResults = props => {
    const [listOfRooms, setListOfRooms] = useState([]);

    const searchAPI = () => {
        {console.log(props)}
        let searchTerm1 = props.match.params.searchTerm1; // this grabs search parameter 
        let searchTerm2 = props.match.params.searchTerm2;
        fetch('/api/rooms/search/' + searchTerm1 + '/' + searchTerm2)
            .then(res => res.json())
            .then(res => setListOfRooms(res))
            .catch(err => err);
    }

    useEffect(() => {
        searchAPI();
    }, [])

    return (
        <div className='main' >
            <MyNavBar />
            <div className='main-content-container' >
            {listOfRooms == 0 ? <h1 className="presentation-highlights" style={{margin:20}}>Looks Like no results were found</h1>: null }
            {listOfRooms == 0 ? <h2 className="presentation-highlights" style={{margin:20}}>Try another term</h2>: null }
            {listOfRooms == 0 ? null : <h7>Search Results: </h7>}
                <div className='default-rooms-grid' >
                    
                    <RoomCards listOfRooms={listOfRooms} />
                </div>
            </div>

        </div>
    )
}

export default SearchResults;
