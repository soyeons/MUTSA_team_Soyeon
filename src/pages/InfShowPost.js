import React,{useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import './ShowPost.css';
import Navbar from './../Nav';

const initialPostList = [
    {num:1, title: '새로 뜬 내한공연 정보 zip', writer: "정보관리자", writeday: "2022.7.13", counts: 54,
    contents:"3개의 내한공연 정보가 이번주 업로드되었습니다."},
];

function ShowPost(){

    const params = useParams();
    const postNum = initialPostList.length-params.postID;

    const title = initialPostList[postNum].title;
    const writer = initialPostList[postNum].writer;
    const writeday = initialPostList[postNum].writeday;
    const contents = initialPostList[postNum].contents;
    let [userName] = useState('user_id');
    // let [feedComments, setFeedComments] = useState([]);
    let [isValid, setIsValid] = useState(false);
    const [repl, setRepl] = useState("");

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
                        <div className="tc">
                            <div className='blank'></div>
                            <div className="detailtitle">{title}</div>
                            <div className='detailw'>
                                {writer}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{writeday}
                                <button className="sp">삭제</button><button className="sp">수정</button>
                            </div>
                            <div className="detailcontents">
                                {contents}
                            </div>
                            <div className='repl'>
                                <div className='replPlus'>  
                                        <button 
                                            type="button"
                                            className="registBtn"
                                            // onClick={onSubmitRepl}
                                        >댓글 작성</button>
                                        <div className='txtSpace'>
                                            <div className='userid'>
                                                user_id
                                            </div>
                                            <textarea
                                                onChange={e => {
                                                    setRepl(e.target.value);
                                                }}
                                                onKeyUp={e => {
                                                    e.target.value.length >= 1
                                                        ? setIsValid(true)
                                                        : setIsValid(false);
                                                }}
                                                onKeyDown={e => {
                                                    e.target.value.length <= 0
                                                        ? setIsValid(false)
                                                        : setIsValid(true);
                                                }}
                                                value={repl} 
                                                spellcheck="false" className="replSpace" placeholder="댓글을 입력하세요..." cols="180" rows="3">
                                            </textarea>
                                        </div>
                                    </div>                                
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    );
}

export default ShowPost;