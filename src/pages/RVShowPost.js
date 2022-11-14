import React, {useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './ShowPost.css';
import Navbar from '../Nav';
import { useSetRecoilState } from 'recoil';
import { isValidAtom } from './atoms';

function ShowPost(){

    const navigate = useNavigate();
    const params = useParams();

    const CommentList = (props)=> {
        return(
            <div className="userCommentBox"> 
                <div className='userName'>{props.author}</div>
                <div className="userComment">{props.comment}</div>
                <div className='replTime'>{props.date}</div>
                &nbsp;&nbsp;
                <button className='plusBtn' value={props.replNum} onClick={e=>{onDeleteRepl(e.target.value)}}>
                    <FontAwesomeIcon icon={faEllipsisVertical}/>
                </button> 
            </div>
        )
    }

    const setIsValidRecoilState = useSetRecoilState(isValidAtom);
    const [post, setPost] = useState([]);
    const [repls, setRepls] = useState([]);
    // const replInput = useRef();

    useEffect(()=>{
        axios.get(`http://172.17.195.227:8000/festivalapp/post/${params.postID}/`)
        .then(response => {
            setPost(response.data.post);
            setRepls(response.data.comment);
        });
    },[]);

    const [repl, setRepl] = useState("");

    const onSubmitRepl = () =>{
        axios.post('http://172.17.195.227:8000/festivalapp/comment/create/',{
            comment: repl,
            post: params.postID,
        }).then(()=>{
            window.location.reload(); //등록버튼 누르고 바로 페이지 새로고침
        })
    } 
    const modifyUrl = '/writepost/modify/'+params.postID;

    const SubmitComponentRepl = React.memo(({onSubmitRepl})=>( //댓글등록 컴포넌트
        <button onClick={onSubmitRepl} className="registBtn">
            댓글 등록
        </button>
    ));

    const onDelete = () =>{ //삭제 기능
        axios.post(`http://172.17.195.227:8000/festivalapp/post/${params.postID}/delete/`,{
            postID: params,
        }).then(()=>{
            window.location.reload();
        })
        navigate('../review');
    };

    const onDeleteRepl = (e) =>{ //삭제 기능
        axios.post(`http://172.17.195.227:8000/festivalapp/comment/${repls[e].pk}/delete/`,{
            postID: repls[e].pk,
        }).then(()=>{
            window.location.reload();
        })
    };

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
                                userId : {post.author}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button className="sp" onClick={onDelete}>삭제</button>
                                <Link to={modifyUrl}>
                                    <button className="sp">수정</button>
                                </Link>
                            </div>
                            <div className="detailcontents">
                                {post.body}
                            </div>
                            <div className="repl">
                                {repls && repls.map((repls,i)=>{
                                    return(
                                        <CommentList 
                                            key = {i}
                                            author={repls.fields.author}
                                            comment={repls.fields.comment}
                                            date={repls.fields.date}
                                            replNum={i}
                                        />
                                    );
                                })}   
                                <div className='replPlus'>  
                                    <SubmitComponentRepl onSubmitRepl={onSubmitRepl}/>
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
                                                    ? setIsValidRecoilState(true)
                                                    : setIsValidRecoilState(false);
                                            }}
                                            onKeyDown={e => {
                                                e.target.value.length <= 0
                                                    ? setIsValidRecoilState(false)
                                                    : setIsValidRecoilState(true);
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