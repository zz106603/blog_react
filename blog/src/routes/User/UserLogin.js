/* BoardDetail.js */
import React, {useEffect, useState} from 'react'

import axios from "axios"
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import instance from '../Axios/AxiosConfig';

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
    
    try{
      const loginUrl = 'http://localhost:8080/api/auth/login'; // Spring Security
      
      const response = await axios.post(loginUrl, userInfo, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

      console.log(response.data);

      if(response.status === 200){
        localStorage.setItem('access_token', response.data.accessToken)
        localStorage.setItem('refresh_token', response.data.refreshToken)
        localStorage.setItem('id', response.data.loginId)
         const previousPage = window.document.referrer;
         const signupPagePattern = /\/user\/signup$/;
         if (previousPage && !signupPagePattern.test(previousPage)) {
          window.history.back(); // 이전 페이지로 이동
         }else
          window.location.href = "/"
        
      }else{
        alert('아이디나 비밀번호가 일치하지 않습니다.')
      }


      // if (response.status === 201) {
      //   alert('회원가입이 완료되었습니다.')
      //   window.location.href = `/user/login`
      //   console.log('Form submitted successfully:', response.data);
      // } else {
      //       alert('회원가입에 실패했습니다.')
      //       console.error('Form submission failed:', response.statusText);
      // }
    } catch (error) {
      alert('아이디나 비밀번호가 일치하지 않습니다.')
      console.error('Error submitting form:', error);
    }

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
