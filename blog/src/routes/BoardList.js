import React, {useEffect, useState} from 'react'
import axios from "axios"
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

const BoardList = () => {

    const [boardList, setBoardList] = useState([]);

    const getBoardList = async () => {
        const resp = (await axios.get('//localhost:8080/api/posts/all')).data
        setBoardList(resp.data)
    }

    useEffect(()=>{
        getBoardList();
    }, []);

    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
    items.push(
            <Pagination.Item key={number} active={number === active}>
            {number}
            </Pagination.Item>,
        );
    }

    return(
        <div style={{marginTop:"2%", marginLeft:"20%", width:"60%"}}>
             <Button style={{margin:"1%", marginLeft:"91%"}} variant="secondary">
                <Nav.Link href={`/board/create`}>글쓰기</Nav.Link>
            </Button>{' '}
        
        {/* <Table striped bordered hover variant="light"> */}
        <table class = "table table-hover">
            <thead class="table-dark">
                <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>카테고리</th>
                </tr>
            </thead>
            <tbody>
               
                {boardList.map((board) => (

                        <tr key={board.id}>
                            <td>{board.id}</td>
                            
                            <td><Link to={`/board/${board.id}`}>{board.title}</Link></td>
                            <td>{board.writer}</td>
                            <td>{board.updateDate}</td>
                            <td>{board.category}</td>
                        </tr>
                    
                ))}
               
            </tbody>
        {/* </Table> */}
        </table>

        <Pagination style={{marginLeft:"0%"}}>{items}</Pagination>
        <br />
        </div>
    );
};

export default BoardList;