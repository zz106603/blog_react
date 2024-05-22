/* BoardDetail.js */
import React, {useEffect, useState} from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Toast from 'react-bootstrap/Toast';
import Nav from 'react-bootstrap/Nav';

const BoardDetail = () => {

    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState([]);

    const getBoard = async () => {
        const resp = (await axios.get(`//localhost:8080/api/posts/${id}`)).data
        setBoard(resp.data)
        setLoading(false);
    }

    useEffect(()=>{
        getBoard();
    }, []);

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
                <small style={{marginLeft:"1%"}}>({board.updateDate})</small>
            </Toast.Header>
            <Toast.Body>{board.content}</Toast.Body>
            <hr/>
            <div style={{margin:"2%"}}>                
            <Button style={{margin:"1%"}} variant="light">
                <Nav.Link href="/board">뒤로가기</Nav.Link>
            </Button>{' '}
            <Button style={{marginLeft:"79%"}} variant="primary">
                <Nav.Link href={`/board/update/${id}`}>수정</Nav.Link>
            </Button>{' '}
            </div>
        </Toast>
      )}


    </div>
  );
};

export default BoardDetail;
