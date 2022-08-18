import React , { useState } from 'react';
import {Link} from "react-router-dom";
import EachPost from '../EachPost';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Navbar from '../Nav';

const initialPostList = [
    {id:1, title: '새로 뜬 내한공연 정보 zip', writer: "정보관리자", writeday: "2022.7.13", counts: 54,
    contents:"3개의 내한공연 정보가 이번주 업로드되었습니다."},
];

function Cminf(props) {

    const [postList] = useState(initialPostList);

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
                <div className="select">
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
                                        <EachPost postID={element.id} title={element.title} writer={element.writer} writeday={element.writeday} counts={element.counts}/>
                                    ))}                                        
                            </table>
                        </div>
                    </div>
                </div>                
            </div>

        </div>
    );
}

export default Cminf;