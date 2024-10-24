import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';

import axios from "axios"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'js-cookie';

import instance from '../routes/Axios/AxiosConfig';

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [loginId, setLoginId] = useState();

    useEffect(() => {
      // 비동기 요청을 수행하기 위해 별도 함수 정의
      const fetchUserInfo = async () => {
        try {
          const response = await instance.get('/api/user/info'); // 기본 설정이 적용된 instance 사용
  
          if (response.status === 200) {
            console.log(response.data);
            setIsLoggedIn(true);
            setLoginId(response.data.loginId); // response.data에서 필요한 정보를 설정
          }
        } catch (error) {
          console.error("사용자 정보를 가져오는 중 오류 발생:", error);
          setIsLoggedIn(false); // 오류 발생 시 로그인 상태 해제
        }
      };
  
      // 비동기 함수 호출
      fetchUserInfo();
    }, [setIsLoggedIn, setLoginId]);


    const handleLogout = async() => {
      try {
        // 로그아웃 요청 보내기 (쿠키 삭제는 서버에서 처리)
        await instance.post('/api/auth/logout', null, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        // 로그아웃 후 리다이렉트 처리
         // 로그아웃 상태로 설정
        setIsLoggedIn(false);
        window.location.href = "/";
      } catch (error) {
        console.error('로그아웃 에러:', error);
        alert('로그아웃 도중 오류가 발생했습니다.');
      }
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