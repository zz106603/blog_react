/* BoardDetail.js */
import React, {useEffect, useState} from 'react'
import { Form, Button, Container, Row, Col,  Alert  } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';


import axios from "axios"

const UserSignup = () => {
   
    const [userInfo, setUserInfo] = useState({
        loginId : '',
        password: '',
        email: '',
        name: '',
        gender: '',
        birthday: '',
        phone: ''
    })

    const [passwordMatch, setPasswordMatch] = useState(true);


    useEffect(()=>{
      
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        let processedValue = value;
        if (name === 'birthday') {
            processedValue = `${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(6, 8)}`;
        }

        if (name === 'passwordCk') {
            setPasswordMatch(userInfo.password === processedValue);
        }


        setUserInfo(prevState => ({
          ...prevState,
          [name]: processedValue
        }));
      };

      console.log(userInfo)

    const handleSubmit = async (event) => {
        event.preventDefault();
        // 폼 제출 시 formData 상태를 사용하여 필요한 작업 수행
        console.log(userInfo);

        if (window.confirm('회원가입을 진행하시겠습니까?')) {
            try {
                const response = await axios.post('http://localhost:8080/api/user/create', userInfo, {
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
        
                if (response.status === 201) { // HTTP 상태 코드가 200번대인 경우 요청이 성공했다고 가정합니다.
                    alert('회원가입이 완료되었습니다.')
                    window.location.href = `/user/login`
                    console.log('Form submitted successfully:', response.data);
                } else {
                    alert('회원가입에 실패했습니다.')
                    console.error('Form submission failed:', response.statusText);
                }
            } catch (error) {
                alert('회원가입에 실패했습니다.')
                console.error('Error submitting form:', error);
            }
        }
    };
    

  // 회원가입 페이지 이동
  const goSignupPage = () => {
    window.location.href = `/user/signup`
  };

  return (

    <Container className="d-flex align-items-center justify-content-center" 
        style={{minHeight: '80vh'}}>
        <div className="border border-3 rounded-3 p-5 mt-3" style={{width: '40%'}}>
            <p className="text-center fw-bold"> 회원가입 </p>
            <Form onSubmit={handleSubmit}>
                <div className='mb-2'><strong>기본정보</strong></div>
                <Form.Group className="mb-2" controlId="formbasicLoginId">
                    <Form.Control type="text" placeholder="아이디" name='loginId' onChange={handleChange} />
                </Form.Group>
                
                <Form.Group className="mb-2">
                    <Form.Control type="password" placeholder="비밀번호" name="password" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control type="password" placeholder="비밀번호 확인" name="passwordCk" onChange={handleChange}/>
                </Form.Group>
                {!passwordMatch && <p className='mb-0' style={{color:"red"}}>비밀번호가 일치하지 않습니다.</p>}

                <div className='mt-4 mb-2'><strong>이메일</strong></div>
                <Form.Group className="mb-2" controlId="formbasicEmail" >
                    <Form.Control type="email" placeholder='이메일' name='email' onChange={handleChange} />
                </Form.Group>

                <div className='mb-2'><strong>이름</strong></div>
                <Form.Group className="mb-2" controlId="formbasicName" >
                    <Form.Control type="text" placeholder='이름' name='name' onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formbasicGender">
                    <Form.Label><strong>성별</strong></Form.Label>
                    <Form.Select name='gender' onChange={handleChange} >
                        <option value="">성별을 선택하세요</option>
                        <option value="M">남성</option>
                        <option value="F">여성</option>
                    </Form.Select>
                </Form.Group>
                
                <div className='mb-2'><strong>생년월일</strong></div>
                <Form.Group className="mb-2" controlId="formbasicBirthday" >
                    <Form.Control type="text" placeholder='생년월일(YYYYMMDD)' name='birthday' onChange={handleChange} />
                </Form.Group>

                <div className='mb-2'><strong>핸드폰 번호</strong></div>
                <Form.Group className="mb-2" controlId="formbasicPhone" >
                    <Form.Control type="tel" placeholder='-를 제외하고 입력해주세요.' name='phone' onChange={handleChange} />
                </Form.Group>
               

                <div className="d-grid gap-2">
                    <Button type="submit" variant="primary">
                        가입하기
                    </Button>
                </div>

                <div style={{marginTop:"10%"}}>
                
                <Button variant="light" onClick={goSignupPage}>
                    <Nav.Link href={`/user/login`}>뒤로가기</Nav.Link>
                </Button>
                </div>
                
            </Form>
        </div>
    </Container>
  );
};

export default UserSignup;
