import React, {useEffect, useState, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'; // 로딩 스피너

import Nav from 'react-bootstrap/Nav';

import Form from 'react-bootstrap/Form';
import instance from '../Axios/AxiosConfig';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; //텍스트 에디터


const BoardCreate = () => {

    const [writer, setWriter] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [grammarErrors, setGrammarErrors] = useState([]); // 문법 오류 상태 추가
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const quillRef = useRef(null); // ReactQuill의 ref 생성


    useEffect(()=>{
        // 비동기 요청을 수행하기 위해 별도 함수 정의
      const fetchUserInfo = async () => {
        try {
          const response = await instance.get('/api/user/info'); // 기본 설정이 적용된 instance 사용
  
          if (response.status === 200) {
            setWriter(response.data.loginId); // response.data에서 필요한 정보를 설정
          }
        } catch (error) {
          console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        }
      };
  
      // 비동기 함수 호출
      fetchUserInfo();
    }, []);
    
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
        setContent(e);
    };

    
    // 문법 검사 함수 추가 (버튼 클릭 시 호출)
    const handleGrammarCheck = async () => {
        setLoading(true);
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            
            // Quill 에디터의 HTML 내용 가져오기
            const htmlContent = editor.root.innerHTML;
    
            // HTML 태그를 제거하여 순수 텍스트 추출 (정규 표현식 사용)
            const plainText = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
    
            try {
                const response = await instance.post('/api/posts/check/grammar', { text: plainText });
                if (response.status === 200) {
                    // console.log("문법 검사 API 응답:", response.data.matches);
                    setGrammarErrors(response.data.matches);
                }
            } catch (error) {
                console.error("문법 검사 중 오류 발생:", error);
            } finally{
                setLoading(false);
            }
        }
    };

    const handleReplacement = (offset, length, replacement, errorIndex) => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
    
            // 전체 텍스트 가져오기 (HTML 태그를 제외한 순수 텍스트)
            const currentText = editor.getText();
    
            // 오프셋 값이 텍스트 범위 내에 있는지 확인
            if (offset > currentText.length) {
                console.error("오프셋 값이 텍스트의 길이를 초과합니다.");
                return;
            }
    
            // 수정할 부분을 중심으로 텍스트를 재구성
            const beforeText = currentText.substring(0, offset);
            const afterText = currentText.substring(offset + length);
            const updatedText = beforeText + replacement + afterText;
    
            // 수정된 텍스트를 에디터에 설정
            editor.setText(updatedText);
    
            // 수정된 텍스트를 React 상태로 업데이트하여 일관성 유지
            setContent(updatedText);
    
            // 수정 완료 후 커서를 수정된 텍스트 끝으로 이동
            editor.setSelection(offset + replacement.length);
    
            // 수정 완료된 항목을 "수정 완료"로 표시
            setGrammarErrors((prevErrors) => {
                const newErrors = [...prevErrors];
                newErrors[errorIndex] = { ...newErrors[errorIndex], fixed: true };
                return newErrors;
            });
        }
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
        
                if (response.status === 200) { // HTTP 상태 코드가 200번대인 경우 요청이 성공했다고 가정합니다.
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
        <div style={{ display: 'flex', width: '100%' }}>
            {/* 왼쪽: 폼 작성 영역 */}
            <div style={{ flex: 3, padding: '20px' }}>
                <Form onSubmit={handleSubmit} style={{ border: '1px solid lightgray', borderRadius: '10px', padding: '2%', margin: '1%' }}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="fw-bold">작성자</Form.Label>
                        <Form.Control plaintext readOnly defaultValue={writer} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="fw-bold">카테고리</Form.Label>
                        <Form.Select aria-label="Default select example" value={category} onChange={handleChangeCategory}>
                            <option>카테고리를 선택하세요.</option>
                            <option value="IT">IT</option>
                            <option value="시사">시사</option>
                            <option value="동물">동물</option>
                            <option value="연예">연예</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="fw-bold">제목</Form.Label>
                        <Form.Control type="text" value={title} onChange={handleChangeTitle} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ height: '300px' }}>
                        <Form.Label className="fw-bold">내용</Form.Label>
                        <ReactQuill
                            ref={quillRef}
                            theme="snow"
                            value={content}
                            onChange={handleChangeContent}
                            style={{ height: '200px' }}
                        />
                    </Form.Group>
                    <div className="container text-center">
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

            {/* 오른쪽: 문법 오류 표시 영역 */}
            <div style={{ flex: 1, padding: '20px', borderLeft: '1px solid lightgray', maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="mt-3 mb-3">
                    <Button variant="primary" onClick={handleGrammarCheck} disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />{' '}
                                문법 검사 중...
                            </>
                        ) : (
                            '문법 검사'
                        )}
                    </Button>
                </div>
                {grammarErrors.length > 0 ? (
                    <ul>
                        {grammarErrors.map((error, index) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                                <strong>잘못된 부분:</strong> "{error.context.text.substring(error.context.offset, error.context.offset + error.context.length)}"
                                <br />
                                <strong>설명:</strong> {error.message}
                                {error.replacements && error.replacements.length > 0 && (
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        style={{ marginLeft: '10px', marginTop: '5px' }}
                                        onClick={(event) => {
                                            event.preventDefault(); // 기본 제출 동작 막기
                                            handleReplacement(error.offset, error.length, error.replacements[0].value, index);
                                        }}
                                        onMouseEnter={() => {
                                            // 마우스를 올렸을 때 잘못된 부분 강조 표시
                                            if (quillRef.current) {
                                                const editor = quillRef.current.getEditor();
                                                editor.focus(); // 에디터에 포커스를 맞춘 후 강조 표시
                                                editor.setSelection(error.offset, error.length);
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            // 마우스를 벗어나면 선택 해제
                                            if (quillRef.current) {
                                                const editor = quillRef.current.getEditor();
                                                editor.blur(); // 포커스 해제
                                            }
                                        }}
                                        disabled={error.fixed} // 수정 완료된 경우 버튼 비활성화
                                    >
                                        {error.fixed ? '수정 완료' : `"${error.replacements[0].value}"로 수정`}
                                    </Button>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>문법 오류가 없습니다.</p>
                )}



            </div>
        </div>
    );
};

export default BoardCreate;
