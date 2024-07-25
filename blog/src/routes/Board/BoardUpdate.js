import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import instance from '../Axios/AxiosConfig';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; //텍스트 에디터

const BoardUpdate = () => {

    const {postId} = useParams();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState([]);

    const [writer, setWriter] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    

    const getBoard = async () => {
        try{
            const resp = (await instance.get(`/api/posts/${postId}`, {
                params: {
                    incrementViewCount: true
                }
            })).data
            setBoard(resp)
            setLoading(false);
    
            setTitle(resp.title)
            setContent(resp.content)
            setCategory(resp.category)
            setWriter(resp.writer)
        }catch(error){
            console.log('API 호출 에러: ', error)
        }
    }

    useEffect(()=>{
        getBoard();
    }, []);

    // 입력값이 변경될 때 상태를 업데이트합니다.
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeCategory = (e) => {
        console.log('Before setCategory:', category);
        setCategory(e.target.value);
    };

    useEffect(()=>{
    }, [category]);

    // 입력값이 변경될 때 상태를 업데이트합니다.
    const handleChangeContent = (e) => {
        // setContent(e.target.value);
        setContent(e);
    };

    //수정
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = {
          id: postId,
          writer: writer,
          title: title,
          content: content,
          category: category
        };

        console.log(formData)
    
        try {
            const response = await instance.put('/api/posts/update', formData, {
                headers: {
                  'Content-Type': 'application/json', // 요청 헤더에 Content-Type을 application/json으로 설정합니다.
                },
            });
    
            if (response.status === 200) { // HTTP 상태 코드가 200번대인 경우 요청이 성공했다고 가정합니다.
                alert('수정이 완료되었습니다.')
                console.log('Form submitted successfully:', response.data);
            } else {
                alert('수정에 실패했습니다.')
                console.error('Form submission failed:', response.statusText);
            }
        } catch (error) {
            alert('수정에 실패했습니다.')
            console.error('Error submitting form:', error);
        }
        window.location.href = `/board/${postId}`
      };

    //삭제
    const deleteBoard = async (event) => {
        event.preventDefault();
        
        if (window.confirm('포스트를 삭제하시겠습니까?')) {
            // try {
            //   await instance.delete(`/api/posts/delete?postId=${postId}`);
            //     alert('삭제되었습니다.')
            //     window.location.href = `/board`;
            // } catch (error) {
            //     console.error('삭제 실패:', error);
            //     alert('삭제에 실패하였습니다.');
            //     window.location.href = `/board/${postId}`;
            //     // 실패했을 때 처리할 로직 추가
            // }

            try{
                const response =  await instance.delete(`/api/posts/delete?postId=${postId}`);
        
                if (response.status === 200) { // HTTP 상태 코드가 200번대인 경우 요청이 성공했다고 가정합니다.
                    alert('삭제가 완료되었습니다.')
                } else {
                    alert('삭제에 실패했습니다.')
                }
            }catch(error){
                alert('삭제에 실패했습니다.')
                console.log(error);
            }
            window.location.href = `/board`;
          }
      };

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (

        <Form onSubmit={handleSubmit} style={{border:"1px solid lightgray", borderRadius:"10px", padding:"2%", margin:"1%", width:"50%", marginLeft:"25%"}}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>작성자</Form.Label>
            <Form.Control plaintext readOnly defaultValue={board.writer} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>카테고리</Form.Label>
            <Form.Select aria-label="Default select example" value={category} onChange={handleChangeCategory}>
                <option>카테고리를 선택하세요.</option>
                <option value="IT">IT</option>
                <option value="시사">시사</option>
                <option value="동물">동물</option>
                <option value="연예">연예</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" value={title} onChange={handleChangeTitle} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{height:"300px"}}>
            <Form.Label>내용</Form.Label>
            <ReactQuill theme="snow" value={content} onChange={handleChangeContent} style={{height:"200px"}}/>
            {/* <Form.Control as="textarea" rows={10} value={content} onChange={handleChangeContent} /> */}
        </Form.Group>

        <div className='container text-center'>
                <div className="row justify-content-start">
                    <div className="col-md-auto">
                        <Button variant="light">
                            <Nav.Link href={`/board/${postId}`}>취소</Nav.Link>
                        </Button>{' '}
                    </div>
                    <div className="col-md-auto">
                        <Button type="submit">수정</Button>
                    </div>
                </div>
                <div className="row justify-content-end">
                    <div className="col-md-auto">
                            <Button variant="danger" onClick={deleteBoard}>
                                <Nav.Link href={`/board/delete/${postId}`}>삭제</Nav.Link>
                            </Button>
                    </div>
                </div>
        </div>

        </Form>

      )}


    </div>
  );
};

export default BoardUpdate;
