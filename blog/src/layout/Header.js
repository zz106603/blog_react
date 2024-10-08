import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [loginId, setloginId] = useState();

    useEffect(() => {
        // localStorage에서 accessToken 가져오기
        const accessToken = localStorage.getItem('access_token');
        const logId = localStorage.getItem('id');
        // accessToken이 있으면 로그인 상태로 설정
        setIsLoggedIn(!!accessToken);
        setloginId(logId);
      }, []);

      

      const handleLogout = () => {
        // 로그아웃 버튼 클릭 시 localStorage에서 accessToken 제거
        localStorage.removeItem('access_token');
        localStorage.removeItem('id');
        // 로그아웃 상태로 설정
        setIsLoggedIn(false);
        window.location.href = `/`
      };

    return(
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/">NINANO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" style={{ flex: 1 }}>
              <Nav.Link href="/board">Board</Nav.Link>
            </Nav>
            <div className="d-flex align-items-center">
              {isLoggedIn ? (
                <div className="d-flex align-items-center">
                  <span>{loginId}님</span>
                  <Button className='btn border-0 ml-3' variant="danger" onClick={handleLogout}>
                    로그아웃
                  </Button>
                </div>
              ) : (
                <Button className='btn border-0' variant="primary">
                  <Nav.Link href="/user/login">로그인</Nav.Link>
                </Button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    );
};

export default Header;