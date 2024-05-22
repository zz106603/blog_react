import React, {useEffect, useState} from 'react'
import axios from "axios"
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

const BoardList = () => {

    const [boardList, setBoardList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState([]);

    const getBoardList = async (page) => {
        const resp = (await axios.get(`//localhost:8080/api/posts/all?page=${page}`)).data
        setBoardList(resp.data.list)
        setPagination(resp.data.pagination)
    }

    useEffect(()=>{
        getBoardList(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > pagination.totalPages) return;
        setCurrentPage(newPage);
    };

    const Pagination = ({ totalPageCount, startPage, endPage, existPrevPage, existNextPage, onPageChange }) => {
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
    
        return (

            <nav aria-label="Page navigation example" style={{marginLeft:"35%"}}>
                <ul className="pagination">
                    <li className="page-item">
                    <button className="page-link"  onClick={() => onPageChange(startPage - 1)}
                     disabled={!existPrevPage} aria-label="Prev">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                    </li>
                    {pages.map(page => (
                        <li className={`page-item ${page === currentPage ? 'active' : ''}`} key={page}>
                            <button className="page-link"
                                onClick={() => onPageChange(page)}
                                disabled={page === currentPage}>
                                {page}
                            </button>
                        </li>
                    ))}
                    <li className="page-item">
                    <button className="page-link"  onClick={() => onPageChange(endPage + 1)}
                     disabled={!existNextPage} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                    </li>
                </ul>

                
            </nav>
        );
    };

    return(
        <div style={{marginTop:"2%", marginLeft:"20%", width:"60%"}}>
        {/* <Table striped bordered hover variant="light"> */}
        <table className = "table table-hover">
            <thead className ="table-dark">
                <tr>
                    <th style={{width:"10%"}}>번호</th>
                    <th style={{width:"10%"}}>제목</th>
                    <th style={{width:"10%"}}>작성자</th>
                    <th style={{width:"10%"}}>작성일</th>
                    <th style={{width:"10%"}}>카테고리</th>
                </tr>
            </thead>
            <tbody>
               
                {boardList.map((board) => (
                        <tr key={board.id}>
                            <td>{board.id}</td>
                            <td><Link to={`/board/${board.id}`}>{board.title}</Link></td>
                            <td>{board.writer}</td>
                            <td>{new Date(board.updateDate).toLocaleString()}</td>
                            <td>{board.category}</td>
                        </tr>
                    
                ))}
               
            </tbody>
        {/* </Table> */}
        </table>

        <Button style={{margin:"1%", marginLeft:"90%"}} variant="secondary">
                <Nav.Link href={`/board/create`}>글쓰기</Nav.Link>
            </Button>{' '}

        <Pagination
                totalPageCount={pagination.totalPageCount}
                startPage={pagination.startPage}
                endPage={pagination.endPage}
                existPrevPage={pagination.existPrevPage}
                existNextPage={pagination.existNextPage}
                onPageChange={handlePageChange}
        />
        <br />
        </div>
    );
};

export default BoardList;