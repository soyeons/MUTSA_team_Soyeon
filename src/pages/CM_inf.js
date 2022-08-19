import React , { useState,useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import EachPost from '../EachPost';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Navbar from './../Nav';

function Cmreview() {

    const [postList, setPostList] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState([]);

    //list?page=${page}&page_size=7
    //response.data.count => //Math.ceil에 넣기
    const getPostList = useCallback(()=>{
        axios.get(`http://172.17.195.227:8000/festivalapp/post/`).then(response => {
            const lastPage = Math.ceil(response.data.count / 7);
            const tempPages = [];
            for (let i=1; i<=lastPage; i++){
                tempPages.push(i);
            }
            setPages(tempPages);
            setPostList(response.data); //이거 하면 서버에 있는 데이터값이 리스트로 들어감
            console.log(response.data);
        })
    },[page]);

    useEffect(getPostList, [page]);

    return (
        <div id="center">
            <nav><Navbar/></nav>
            <div>
                <div id="select">
                    <Link to="/review">
                        <input type="button" value="후기 게시판"/>
                    </Link>
                    <Link to="/friends">
                        <input type="button" value="친구 구하기 게시판"/>                      
                    </Link>                  
                    <Link to="/ticket">
                        <input type="button" value="티켓 양도 게시판"/>
                    </Link>
                    <Link to="/inf">
                        <input type="buttonClick" value="정보 공유 게시판"/>                    
                    </Link>
                </div>
                <div>
                    <div className="YellowSquare">
                        <div className="PostList">
                            <div className="Blank">
                                <Link to = "/writepost">
                                    <button className="writeBtn">
                                        <FontAwesomeIcon icon={faPenToSquare}/>
                                        &nbsp;작성하기 
                                    </button>                          
                                </Link>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <td></td>
                                        <td>제목</td>
                                        <td>작성자</td>
                                        <td>작성일</td>
                                        <td>조회</td>
                                    </tr>
                                </thead>
                                    {postList.map((element)=>(
                                        <EachPost postID={element.id} title={element.title} writer={element.author} writeday={element.date} counts={element.counts}/>
                                    ))}                                        
                            </table>
                            <div className='pageNum'>
                                <button onClick={()=>{
                                    if (page>1){
                                    setPage(page - 1)                                    
                                    }
                                    }}>
                                    <FontAwesomeIcon icon={faArrowLeft}/>
                                </button>
                                {pages.map(pageNum => (
                                <button key={pageNum} onClick={()=>setPage(pageNum)} className="pageNumBtn">{pageNum}</button>                       
                            ))}
                                <button onClick={()=>{
                                    if (pages.length>page){
                                    setPage(page+1)                                    
                                    }
                                    }}>
                                    <FontAwesomeIcon icon={faArrowRight}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Cmreview;