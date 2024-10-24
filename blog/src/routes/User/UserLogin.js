/* BoardDetail.js */
import React, {useEffect, useState} from 'react'

import axios from "axios"
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import instance from '../Axios/AxiosConfig';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const UserLogin = () => {

    const [userInfo, setUserInfo] = useState({
        loginId : '',
        password: ''
    })
   
    useEffect(()=>{
      
    }, []);

 // 이메일, 비밀번호
 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo(userInfo => ({
      ...userInfo,
      [name]: value,
    }));
  };

  // 유효성 검사
    //const isInvaild =
    //userInfo.email.includes('@') &&
    //userInfo.email.includes('.') &&
    //userInfo.password.length >= 10

    const loginProgcess = async (event) => {
      event.preventDefault();
    
      try {
        const loginUrl = '/api/auth/login'; // axios 인스턴스의 baseURL을 사용하기 때문에 상대 경로 사용
    
        // 사용자 로그인 정보 전송 (쿠키는 서버에서 설정하도록 함)
        const response = await instance.post(loginUrl, userInfo, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        // 로그인 성공 시
        if (response.status === 200) {
          // 쿠키는 서버에서 설정됨. 쿠키에 토큰을 설정한 상태로, 이후 요청에 사용됨.
          const previousPage = window.document.referrer;
          const signupPagePattern = /\/user\/signup$/;
    
          // 이전 페이지로 이동 또는 홈으로 이동
          if (previousPage && !signupPagePattern.test(previousPage)) {
            window.history.back(); // 이전 페이지로 이동
          } else {
            window.location.href = "/"; // 홈 페이지로 이동
          }
        } else {
          // 로그인 실패 시 처리
          alert('아이디나 비밀번호가 일치하지 않습니다.');
        }
      } catch (error) {
        // 로그인 요청 실패 시 처리
        console.log('로그인 에러:', error);
        alert('로그인 도중 오류가 발생했습니다.');
      }
    };
    
const oauthLoginFailure = () => {
  alert('OAuth 로그인 처리 중 오류가 발생했습니다.');
};

  // 회원가입 페이지 이동
  const goSignupPage = () => {
    window.location.href = `/user/signup`
  };

  //Oauth 페이지 이동
  const startOauthLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';

    // const googleAuthUrl = 'http://localhost:8080/oauth2/authorization/google';
    // window.open(googleAuthUrl, '_blank', 'width=500,height=600');
};
  

  return (

    <Container className="d-flex align-items-center justify-content-center" 
        style={{minHeight: '80vh'}}>
        <div className="border border-3 rounded-3 p-5" style={{width: '40%'}}>
            <p className="text-center"> NINANO </p>
            <Form onSubmit={loginProgcess}>
                <Form.Group className="mb-2" controlId="formbasicEmail" >
                    <Form.Label> 아이디 </Form.Label>
                    <Form.Control type="text" name='loginId' onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label> 비밀번호 </Form.Label>
                    <Form.Control type="password" name="password" onChange={handleInputChange}/>

                </Form.Group>
                
                <div className="d-grid gap-2">
                    <Button type="submit" variant="primary">
                        로그인
                    </Button>
                </div>
                <div className="d-grid gap-2 mt-2">
                  <Button variant="light" onClick={startOauthLogin}>
                          Google로 로그인
                  </Button>
                </div>

                <div style={{marginTop:"10%"}}>
                <Button variant="light" onClick={goSignupPage}>
                        회원가입
                </Button>
                </div>
                
            </Form>
        </div>
    </Container>
  );
};

export default UserLogin;
