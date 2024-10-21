import React, {useEffect, useState} from 'react'
import axios from "axios"
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import instance from '../Axios/AxiosConfig';
import { Form, Container, Row, Col } from 'react-bootstrap'

const BoardList = () => {

    const backgroundImageStyle = {
        // backgroundImage: 'url(/sky.jpg)', // 여기에 이미지 경로를 입력하세요
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // width: '100%',
        // height: '100%',
        // // opacity: 0.5, // 이미지의 불투명도를 조절합니다 (0.0 - 1.0)        
        // zIndex: -1 // 배경 이미지를 맨 뒤로 보냅니다
    };


    const [sortOrder, setSortOrder] = useState(1);
    const [boardList, setBoardList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({});

    const getBoardList = async (page) => {
        try{
            const resp = (await instance.get(`/api/posts/all`, {
                params: {
                    page: page,
                    orderType: sortOrder
                }
            })).data
            setBoardList(resp.list)
            setPagination(resp.pagination)
        }catch(error){
            console.error('API 요청 에러: ', error)
            window.location.href = "/user/login"
        }
    }

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
      };

    useEffect(()=>{
        getBoardList(currentPage);
    }, [sortOrder]);

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
        <div style={{marginTop:"2%", marginLeft:"20%", width:"60%", ...backgroundImageStyle}}>
        {/* <Table striped bordered hover variant="light"> */}


        <div className="d-flex justify-content-between mb-1">
            <select style={{width:"15%"}} className="form-select" aria-label="Default select example" onChange={handleSortChange}>
                <option value="1">최신순</option>
                <option value="2">오래된순</option>
                <option value="3">조회순</option>
                <option value="4">추천순</option>
            </select>

            <div className="input-group" style={{width:"30%"}}>
                <input type="search" className="form-control rounded" placeholder="검색어를 입력하세요." aria-label="Search" aria-describedby="search-addon" />
                <button type="button" className="btn btn-outline-primary">검색</button>
            </div>
        </div>

        <table className = "table table-hover">
            <thead className ="table-dark">
                <tr className='text-center'>
                    <th style={{width:"10%"}}>번호</th>
                    <th style={{width:"15%"}}>제목</th>
                    <th style={{width:"10%"}}>카테고리</th>
                    <th style={{width:"15%"}}>작성일</th>
                    <th style={{width:"10%"}}>작성자</th>
                    <th style={{width:"5%"}}>조회</th>
                    <th style={{width:"5%"}}>추천</th>
                </tr>
            </thead>
            <tbody>
                {boardList.map((board) => (
                        <tr className='text-center' key={board.id}>
                            <td>{board.id}</td>
                            {/* <td><Link to={`/board/${board.id}`}>{board.title}</Link></td> */}
                            <td><a href={`/board/${board.id}`} className="btn btn-light border-0 text-decoration-none">{board.title}</a></td>
                            <td>{board.category}</td>
                            <td>{new Date(board.updateDate).toLocaleString()}</td>
                            {/* <td>{board.formattedDate}</td> */}
                            <td>{board.writer}</td>
                            <td>{board.selectCount}</td>
                            <td>{board.recomCount}</td>
                            
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