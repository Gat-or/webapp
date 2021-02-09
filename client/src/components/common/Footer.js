import React from 'react'
import { Container, Navbar, NavbarBrand } from 'react-bootstrap';
import {FaFacebookF, FaTwitter, FaDiscord} from 'react-icons/fa'

const Footer=()=>{
    return(
        <div style={{  position: "absolute",
        width: "100%", }}>   
                <Container>
                <Navbar color="dark" dark>
                    <NavbarBrand href="#"><FaFacebookF/></NavbarBrand>
                    <NavbarBrand href="#"><FaTwitter/></NavbarBrand>
                    <NavbarBrand href="#"><FaDiscord/></NavbarBrand>
                        <NavbarBrand href="/aboutus" className="ml-auto">About us</NavbarBrand>
                        <NavbarBrand href="/FAQs">FAQs</NavbarBrand>
                        <NavbarBrand href="/shop">Shop</NavbarBrand>       
                </Navbar>
                </Container>
        </div>
    )
}
export default Footer;
