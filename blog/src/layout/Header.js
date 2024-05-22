import React from 'react'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
    return(
        <header>
            <Navbar expand="lg" className="bg-body-tertiary">
            <Container style={{marginLeft:"1%", marginRight:"0%"}}>
                <Navbar.Brand href="/">NINANO</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/board">Board</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            <div style={{marginLeft:"6%"}}>
                <Button style={{}} variant="secondary">
                    <Nav.Link href={`/user/login`}>로그인</Nav.Link>
                </Button>{' '}
            </div>
            </Navbar>

        </header>
    );
};

export default Header;