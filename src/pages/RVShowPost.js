import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import './ShowPost.css';

const initialPostList = [
    {num: 2, title: '스우파 콘서트 후기~', writer:"choyeons", writeday:"2022.7.13", counts:14,
    contents: "스우파 콘서트 후기남깁니다." },
    {num: 1, title: '싸이 흠뻑쇼 후기 남겨요!', writer: "choyeon2e", writeday: "2022.6.24", counts: 17,
    contents: "싸이 흠뻑쇼 다녀왔어요 재미있었습니다."},
];


function ShowPost(){

    const params = useParams();
    const postNum = initialPostList.length-params.postID;

    const title = initialPostList[postNum].title;
    const writer = initialPostList[postNum].writer;
    const writeday = initialPostList[postNum].writeday;
    const contents = initialPostList[postNum].contents;


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
                    <div class="tc">
                        <div class="detailtitle">{title}</div>
                        <div class='detailw'>
                            {writer}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{writeday}
                            <button class="sp">삭제</button><button class="sp">수정</button>
                        </div>
                        <div class="detailcontents">
                            {contents}
                        </div>
                        <div class="repl">
                            <button class="registBtn">댓글 작성</button>
                            {/* <input type="text" className='replSpace'></input> */}
                            <textarea spellcheck="false" class="replSpace" placeholder="댓글을 입력하세요..." cols="180" rows="3"></textarea>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowPost;