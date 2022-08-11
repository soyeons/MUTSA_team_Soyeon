import React , { useState } from 'react';
import {Link} from "react-router-dom";
import EachPost from '../EachPost';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const initialPostList = [
    {id:3, title: '청춘페스티벌 연석 양도', writer:"ticketsss", writeday:"2022.7.12", counts:1,
    contents: "청춘페스티벌 연석 양도해요~ 자리는 S석 337,338번입니당 "},
    {id:2, title: '흠뻑쇼 R석 양도해요', writer:"lllls", writeday:"2022.7.11", counts:5, 
    contents: "흠뻑쇼 R석 한자리 양도합니다. 관심있으신분 댓글남겨주세욥. "},
    {id:1, title: '빌리아일리시 내한공연 티켓 양도합니다.', writer: "티켓쟁이", writeday: "2022.7.10", counts: 7,
    contents: "빌리아일리시 내한공연 티켓 양도해요. 사정이 생겨서 못가게되었습니다ㅜ"},
];


function Cmticket(props) {

    const [postList] = useState(initialPostList);

    return (
        <div id="center">
            <div id="select">
                <Link to="/review">
                    <input type="button" value="후기 게시판"/>
                </Link>
                <Link to="/friends">
                    <input type="button" value="친구 구하기 게시판"/>                      
                </Link>
                <Link to="/ticket">
                    <input type="buttonClick" value="티켓 양도 게시판"/>
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
                                    <EachPost postID={element.id} title={element.title} writer={element.writer} writeday={element.writeday} counts={element.counts}/>
                                ))}                                        
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cmticket;