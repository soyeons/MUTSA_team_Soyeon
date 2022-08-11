import React , { useState,useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import EachPost from '../EachPost';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const initialPostList = [
    {id: 2, title: '스우파 콘서트 후기~', writer:"choyeons", writeday:"2022.7.13", counts:14,
    contents: "스우파 콘서트 후기남깁니다." },
    {id: 1, title: '싸이 흠뻑쇼 후기 남겨요!', writer: "choyeon2e", writeday: "2022.6.24", counts: 17,
    contents: "싸이 흠뻑쇼 다녀왔어요 재미있었습니다."},
];


function Cmreview({apiUrl}) {

    const [postList, setPostList] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState([]);

    //response.data.count => Math.ceil 에 넣기
    const getPostList = useCallback(()=>{
        axios.get(`${apiUrl}list/?page=${page}&page_size=7`).then(response => {
            const lastPage = Math.ceil( response.data.count / 7);
            const tempPages = [];
            // console.log(response);
            for (let i=1; i<=lastPage; i++){
                tempPages.push(i);
            }
            setPages(tempPages);

            setPostList(response.data.results); //이거 하면 서버에 있는 데이터값이 리스트로 들어감
            // setPostList(initialPostList);
        })
    });

    useEffect(getPostList, [page]);

    return (
        <div id="center">
            <div id="select">
                <Link to="/review">
                    <input type="buttonClick" value="후기 게시판"/>
                </Link>
                <Link to="/friends">
                    <input type="button" value="친구 구하기 게시판"/>                      
                </Link>                  
                <Link to="/ticket">
                    <input type="button" value="티켓 양도 게시판"/>
                </Link>
                <Link to="/inf">
                    <input type="button" value="정보 공유 게시판"/>                    
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
                                    <EachPost postID={element.id} title={element.title} writer="user_id" writeday={element.writeday} counts={element.counts}/>
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
    );
}

export default Cmreview;