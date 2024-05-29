/* BoardDetail.js */
import React, {useEffect, useState} from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Toast from 'react-bootstrap/Toast';
import Nav from 'react-bootstrap/Nav';
import instance from '../Axios/AxiosConfig';
import Form from 'react-bootstrap/Form';

const BoardDetail = () => {

    const [isRecommended, setIsRecommended] = useState(false);

    const loginId = localStorage.getItem('id');
   
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState([]);

    const getBoard = async () => {
      try{
        const resp = (await instance.get(`/api/posts/${id}`)).data
        setBoard(resp.data)
        setLoading(false);
      }catch(error){
        console.log('API 호출 에러: ', error)
      }
    }

    const handleSubmit = async(event) => {
      event.preventDefault();
      
      const params = {
        postId : id,
        userId: localStorage.getItem('id')
      }
      console.log(params)

      try{
        const response = await instance.post(`/api/posts/recom`, params, {
          headers: {
              'Content-Type': 'application/json'
          }
        });
        if(response){
          getBoard()
          checkRecommendation();
          alert('추천되었습니다.')
        }
        
      }catch(error){
        console.log('API 호출 에러: ', error)
      }
    }
    
    const checkRecommendation = async () => {
      try{
        const response = await instance.get(`/api/posts/recom/check`, {
          params: {
              userId: loginId,
              postId: id
          }
        });

        console.log(response.data)
        if(response.data.status === 200){
          setIsRecommended(true);
        }else{
          console.log(204)
          setIsRecommended(false);
        }
      }catch(error){
        console.log('API 호출 에러: ', error)
      }
    };

    useEffect(()=>{
        getBoard();
        checkRecommendation();
    }, []);

    // 수정 버튼을 보여줄지 여부를 결정하는 함수
    const canEdit = () => {
      return loginId === board.writer;
    };

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Toast style={{margin:"1%", width:"50%", marginLeft:"25%"}}>
            <Toast.Header closeButton={false}>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">{board.title}</strong>
                <small>{board.writer}</small>
                <small style={{marginLeft:"1%"}}>({new Date(board.updateDate).toLocaleString()})</small>

                <small style={{marginLeft:"1%"}}>
                  <Form onSubmit={handleSubmit}>
                    <Button disabled={isRecommended} type="submit" variant="primary">추천하기
                    <svg className='mb-1' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
</svg>
                    </Button>
                  </Form>
                  </small>

                  <small style={{marginLeft:"1%"}}>조회{board.selectCount}</small>
                  <small style={{marginLeft:"1%"}}>추천{board.recomCount}</small>

            </Toast.Header>
            <Toast.Body style={{height: "60vh", overflowY: "auto"}}>{board.content}</Toast.Body>
            <hr/>

            <div className='container text-center'>
                <div className="row justify-content-between mb-3">
                    <div className="col-md-auto">
                      <Button variant="light">
                      <Nav.Link href="/board">뒤로가기</Nav.Link>
                      </Button>{' '}
                    </div>
                    <div className="col-md-auto">
                      {canEdit() && (  
                        <Button variant="primary">
                        <Nav.Link href={`/board/update/${id}`}>수정</Nav.Link>
                        </Button>
                      )}
                    </div>
                </div>
            </div>
        </Toast>
      )}


    </div>
  );
};

export default BoardDetail;
