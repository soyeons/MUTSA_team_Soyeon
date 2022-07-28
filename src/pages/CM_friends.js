import React , { useState } from 'react';
import {Link} from "react-router-dom";
import EachPost from '../EachPost';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const initialPostList = [
    {num:2, title: '워터밤 동행 구합니다아~', writer:"ㅎㅎ", writeday:"2022.7.13", counts:14,
    contents: "7/16 워터밤 동행 한 분 구해용 댓글 남겨주세요" },
    {num:1, title: '랩비트 페스티벌 함께 갈 사람!!', writer: "레츠고", writeday: "2022.6.24", counts: 17,
    contents: "랩비트 페스티벌 같이가실분?"},
];

function Cmfriends() {
    
    const [postList] = useState(initialPostList);


    return (
        <div id="center">
            <div id="select">
                <Link to="/review">
                    <input type="button" value="후기 게시판"/>
                </Link>
                <Link to="/friends">
                    <input type="buttonClick" value="친구 구하기 게시판"/>                      
                </Link>
                <Link to="/ticket">
                    <input type="button" value="티켓 양도 게시판"/>
                </Link>
                <Link to="/inf">
                    <input type="button" value="정보 공유 게시판"/>                    
                </Link>
            </div>
            <div>
                <div class="YellowSquare">
                    <div class="PostList">
                        <div class="Blank">
                            <Link to = "/writepost">
                                <button class="writeBtn">
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
                                    <EachPost postID={element.num} title={element.title} writer={element.writer} writeday={element.writeday} counts={element.counts}/>
                                ))}                                        
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cmfriends;