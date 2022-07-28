import React , { useState } from 'react';
import {Link} from "react-router-dom";
import EachPost from '../EachPost';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const initialPostList = [
    {num: 2, title: '스우파 콘서트 후기~', writer:"choyeons", writeday:"2022.7.13", counts:14,
    contents: "스우파 콘서트 후기남깁니다." },
    {num: 1, title: '싸이 흠뻑쇼 후기 남겨요!', writer: "choyeon2e", writeday: "2022.6.24", counts: 17,
    contents: "싸이 흠뻑쇼 다녀왔어요 재미있었습니다."},
];
    
function Cmreview() {

    const [postList] = useState(initialPostList);

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

export default Cmreview;