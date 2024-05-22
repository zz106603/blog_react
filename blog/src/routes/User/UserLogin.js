/* BoardDetail.js */
import React, {useEffect, useState} from 'react'

import UserInput from './UserInput'
import UserButton from './UserButton';

import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const UserLogin = () => {

    const [userInfo, setUserInfo] = useState({
        loginId : '',
        password: ''
    })
   
    useEffect(()=>{
      
    }, []);

 // 이메일, 비밀번호
 const handleInputChange = event => {
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

    
   const loginProgcess = () => {
//     fetch('/data/Login.json', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//       body: JSON.stringify({
//         email: userInfo.email,
//         password: userInfo.password,
//       }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (data.message === 'LOGIN SUCCESS') {
//           alert('로그인 되었습니다.');
//           localStorage.setItem('token', data.message);
//           navigate('/main');
//         } else {
//           alert('가입되지 않은 정보입니다.');
//         }
//       });
   };

  // 회원가입 페이지 이동
  const goSignupPage = () => {
    window.location.href = `/user/signup`
  };

  return (

    <Container className="d-flex align-items-center justify-content-center" 
        style={{minHeight: '80vh'}}>
        <div className="border border-3 rounded-3 p-5" style={{width: '40%'}}>
            <p className="text-center"> NINANO </p>
            <Form onSubmit={loginProgcess}>
                <Form.Group className="mb-2" controlId="formbasicEmail" >
                    <Form.Label> 아이디 </Form.Label>
                    <Form.Control type="text" name='id'/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label> 비밀번호 </Form.Label>
                    <Form.Control type="password" name="pw"/>

                </Form.Group>
                
                <div className="d-grid gap-2">
                    <Button type="submit" variant="primary">
                        로그인
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
