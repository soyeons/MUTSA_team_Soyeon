import React, {useState, useEffect, useRef, useMemo} from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './ShowPost.css';
import Navbar from '../Nav';

// const initialPostList = [
//     {num: 2, title: '스우파 콘서트 후기~', writer:"choyeons", writeday:"2022.7.13", counts:14,
//     contents: "스우파 콘서트 후기남깁니다." },
//     {num: 1, title: '싸이 흠뻑쇼 후기 남겨요!', writer: "choyeon2e", writeday: "2022.6.24", counts: 17,
//     contents: "싸이 흠뻑쇼 다녀왔어요 재미있었습니다."},
// ];

let today = new Date();
let time = {
    year: today.getFullYear(),
    month: today.getMonth()+1,
    date: today.getDate(),
    hours: today.getHours(),
    minutes: today.getMinutes(),
};


function ShowPost({apiUrl}){

    const params = useParams();
    
    // fetch(`${apiUrl}/${params.postID}`)
    // .then((response) => response.json())
    // .then((json) => console.log(json));



    // const postNum = initialPostList.length-params.postID;

    // const title = initialPostList[postNum].title;
    // const writer = initialPostList[postNum].writer;
    // const writeday = initialPostList[postNum].writeday;
    // const contents = initialPostList[postNum].contents;

    let [userName] = useState('user_id');
    // let [feedComments, setFeedComments] = useState([]);
    let [isValid, setIsValid] = useState(false);

    // let posting = e => {
    //     const copyFeedComments = [...feedComments];
    //     copyFeedComments.push(comment);
    //     setFeedComments(copyFeedComments);
    //     setComment('');
    // };



    // const DataList = props => {
        let timestring = `${time.year}.${time.month}.${time.date}. ${time.hours}:${time.minutes}`;
    //     return(
    //         <div className="userCommentBox"> 
    //             <div>{props.title}</div>
    //             <div>{props.userId}</div>
    //             <div>{timestring}</div>
    //             <div>{props.body}</div>
    //         </div>
    //     )
    // }


    const CommentList = props => {
        let timestring = `${time.year}.${time.month}.${time.date}. ${time.hours}:${time.minutes}`;
        return(
            <div className="userCommentBox"> 
                <div className='userName'>{props.userName}</div>
                <div className="userComment">{props.userComment}</div>
                <div className='replTime'>{timestring}</div>
                &nbsp;&nbsp;
                <button className='plusBtn'>
                    <FontAwesomeIcon icon={faEllipsisVertical}/>
                </button>
            </div>
        )
    }

    const [post, setPost] = useState([]);
    const [repls, setRepls] = useState([]);
    const replInput = useRef();
///${params.postID}
    useEffect(()=>{
        console.log(params);
        axios.get(`${apiUrl}${params.postID}`)
        .then(response => {
            setPost(response.data);
            replInput.current.focus();
            setRepls(response.data.repls);
            console.log(response.data);
        });
    },[]);

    const [repl, setRepl] = useState("");

    const onSubmitRepl = () =>{
        axios.post(`${apiUrl}repl/`,{
            contents: repl,
            post: params.postID,
        }).then(()=>{
            window.location.reload(); //등록버튼 누르고 바로 페이지 새로고침
        })
    } 


    const modifyUrl = '/writepost/modify/'+params.postID;
    console.log(modifyUrl);


    return (
        <div id="center">
            <nav>
               <Navbar/> 
            </nav>
            <div>
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
                            <div className="detailtitle">
                                {post.title}
                            </div>
                            <div className='detailw'>
                                userId : {post.userId}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {timestring}
                                <button className="sp">삭제</button>
                                <Link to={modifyUrl}>
                                    <button className="sp">수정</button>
                                </Link>
                            </div>
                            <div className="detailcontents">
                                {post.body}
                            </div>
                            <div className="repl">
                                {/* {post && post.repls.map((commentArr, i)=>{
                                    return(
                                        <CommentList
                                            userName={userName}
                                            userComment={commentArr}
                                            // date = {commentDate}
                                            key={i}
                                        /> 
                                    );
                                })}    */}
                                <div className='replPlus'>  
                                    <button 
                                        type="button"
                                        className="registBtn"
                                        onClick={onSubmitRepl}
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