import React from 'react';

import { Button, Navbar, Nav, Container } from "react-bootstrap";

export const NavBar = ({connectWallet, disconnectWallet, connected}) => {
    return (
        <div className=''>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand  href="/">Zuri</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link className="mx-2" href="/">Home</Nav.Link>
                        <Nav.Link className="mx-2" href="/election">Admin</Nav.Link>
                        <Nav.Link className="mx-2" href="/vote">Vote</Nav.Link>
                        {
                            connected ?  <button  className='mx-4 bg-light text-dark' onClick={disconnectWallet}>Connected to </button>
                            : <button onClick={connectWallet} className='mx-4 bg-light text-dark'>Connect wallet</button>
                        }
                       
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
