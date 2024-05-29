import React, {useEffect, useState} from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Toast from 'react-bootstrap/Toast';
import Nav from 'react-bootstrap/Nav';

import Form from 'react-bootstrap/Form';
import instance from '../Axios/AxiosConfig';

const BoardCreate = () => {

    // const [writer, setWriter] = useState('');
    
    const writer = localStorage.getItem('id') || ''; // 기본값은 빈 문자열입니다.
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(()=>{

    }, []);

    // const handleChangeWriter = (e) => {
    //     setWriter(e.target.value);
    // };
    
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
    };

    useEffect(()=>{
    }, [category]);

    // 입력값이 변경될 때 상태를 업데이트합니다.
    const handleChangeContent = (e) => {
        setContent(e.target.value);
    };

    //등록
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = {
          writer: writer,
          title: title,
          content: content,
          category: category
        };

        console.log(formData)

        if (window.confirm('포스트를 등록하시겠습니까?')) {
            try {
                const response = await instance.post('/api/posts/create', formData, {
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
        
                if (response.status === 201) { // HTTP 상태 코드가 200번대인 경우 요청이 성공했다고 가정합니다.
                    alert('등록이 완료되었습니다.')
                    console.log('Form submitted successfully:', response.data);
                } else {
                    alert('등록에 실패했습니다.')
                    console.error('Form submission failed:', response.statusText);
                }
            } catch (error) {
                alert('등록에 실패했습니다.')
                console.error('Error submitting form:', error);
            }
        }
        window.location.href = `/board`
      };


  return (
    <div>
        <Form onSubmit={handleSubmit} style={{border:"1px solid lightgray", borderRadius:"10px", padding:"2%", margin:"1%", width:"50%", marginLeft:"25%"}}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className='fw-bold'>작성자</Form.Label>
            {/* <Form.Control type="text" value={writer} readOnly /> */}
            <Form.Control plaintext readOnly defaultValue={writer} />
            {/* <Form.Control type="text" value={writer} onChange={handleChangeWriter} /> */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className='fw-bold'>카테고리</Form.Label>
            <Form.Select aria-label="Default select example" value={category} onChange={handleChangeCategory}>
                <option>카테고리를 선택하세요.</option>
                <option value="IT">IT</option>
                <option value="시사">시사</option>
                <option value="동물">동물</option>
                <option value="연예">연예</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className='fw-bold'>제목</Form.Label>
            <Form.Control type="text" value={title} onChange={handleChangeTitle} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className='fw-bold'>내용</Form.Label>
            <Form.Control as="textarea" rows={10} value={content} onChange={handleChangeContent} />
        </Form.Group>
            <div className='container text-center'>
                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        <Button variant="light">
                            <Nav.Link href={`/board`}>취소</Nav.Link>
                        </Button>{' '}
                    </div>
                    <div className="col-md-auto">
                        <Button type="submit">저장</Button>
                    </div>
                </div>
            </div>
        </Form>



    </div>
  );
};

export default BoardCreate;
