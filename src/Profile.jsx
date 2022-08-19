import React, {useContext,useState,useEffect,useRef} from 'react';
import "./Profile.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import userContext from "./context/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faHeartCircleCheck, faPenToSquare, faComment} from "@fortawesome/free-solid-svg-icons";

const Profile = ( ) => {
    const context = useContext(userContext);
    const [isEdit, setIsEdit] = useState(false); //수정버튼 일단은 false 
    const [localContent, setLocalContent] = useState(context.user.name); //수정하기 textarea값 저장 위함
    const localInput = useRef();
    const [checkList, setCheckList] = useState([]);
    const [checkListReply, setCheckListReply] = useState([])
    const [selectedBread, setSelectedBread] = useState([]);
    const [kakaoId, setKakaoId] = useState(context.user.kakaoId)
    const [post, setPost] = useState(context.user.post)
    const [name,setName] = useState(context.user.name)
    const [email,setEmail] = useState(context.user.email)
    const [like, setLike] = useState(context.user.like)
    const [reply, setReply] = useState(context.user.reply)
    const navigate = useNavigate();
    const [isPostShown, setIsPostShown] = useState(false); //체크박스 보이기 안보이기
    const [isReplyShown, setIsReplyShown] = useState(false); //체크박스 보이기 안보이기
    const [deleteButton, setDelete] = useState("관리하기");
    const [deleteButtonReply, setDeleteReply] = useState("관리하기")

    
  


    const changeSingleBox = (checked, id) => {
      if(checked){
        setCheckList([...checkList, id]);  
      } else {
        setCheckList(checkList.filter((el) => el !== id));
      }
    };

    const changeSingleBoxReply = (checked, id) => {
      if(checked){
        setCheckListReply([...checkListReply, id]);  
      } else {
        setCheckListReply(checkListReply.filter((el) => el !== id));
      }
    };

    const deleteSelected = () => {
      setSelectedBread(selectedBread.filter(el => !checkList.includes(el.id)))
      if(checkList.length > 0){
        if(window.confirm('게시글을 삭제 하시겠습니까?')){
          for(let i=0; i<checkList.length; i++){
            setPost(post.filter(post => post.pk !== parseInt(checkList[i])))
            context.setUser({
              post : post
            })
            axios.post(`http://172.17.195.227:8000/accounts/kakao/user/${kakaoId}/post/delete/${checkList[i]}/`,{
            }).then(response => {
              context.setUser({
                post : response.data.user_post
              })
            })
      setCheckList([]);
    }}}}



    const logOut = (kakaoId) => {
        context.setUser({ kakaoId : "", name: "", email: "", like: "", post: "", reply: "", logined:false });
        navigate('/')
        localStorage.clear();
        axios.post(`http://172.20.10.4:8000/accounts/kakao/user/${kakaoId}/unlink/`).then(response => {
            navigate('/')})}

    const controlPost = (e) => {
        setIsPostShown(current => !current);
        setDelete(value => value ==="삭제하기" ? "관리하기" : "삭제하기")
        deleteSelected()
        }
    

    const controlReply = (event) => {
        setIsReplyShown(current => !current);
        setDeleteReply(value => value === "삭제하기" ? "관리하기" : "삭제하기")
        deleteReply()
      };

      const deleteReply = () => {
        setSelectedBread(selectedBread.filter(el => !checkListReply.includes(el.id)))
        if(checkListReply.length > 0){
          if(window.confirm('댓글을 삭제 하시겠습니까?')){
            for(let i=0; i<checkListReply.length; i++){
              setReply(reply.filter(reply => reply.pk !== parseInt(checkListReply[i])))
              context.setUser({
                reply : reply
              })
              axios.post(`http://172.17.195.227:8000/accounts/kakao/user/${kakaoId}/comment/delete/${checkListReply[i]}/`,{
              }).then(response => {
                context.setUser({
                  reply : response.data.user_comment
                })
              })
        setCheckListReply([]);
      }}}}
    
    const controlName = (e) => {
      document.getElementsByTagName("INPUT")[0].setAttribute("type", "text");  
    }

    const nameChange = (e) => {
      setName(name.concat(e.target.value))
    }

    const toggleIsEdit = () => setIsEdit(!isEdit); //호출되면 setIsEdit()이 되고 수정상태 변경

    const handleEdit = () => {
      if(window.confirm("닉네임을 수정하시겠습니까?")){
        onEdit(localContent);
        toggleIsEdit();
        axios.post(`http://172.20.10.4:8000/accounts/kakao/user/${kakaoId}/profile/`,{
          name : localContent}).then(response => {
              context.setUser({
                name: response.data.nickname
              })
            })
    }}

    const onEdit = (newContent) => {
      setName(newContent)
      //axios 쏴주는곳
    }
    
    return (
        <>
        <div className= "yellowBox"></div>
        <div className="mainBox">
            <div className= 'nameMain'>
                <div className="nameIcon">
                    <FontAwesomeIcon icon={faUser} size="lg" /></div><p className = "name">이름(또는 닉네임) </p> 
                    <div value = {name} onChange ={nameChange} className="nameBox">
                      { //수정중인 상태 ? 수정폼 보여줌, 수정중인 상태 아니면컨텐츠 보여주기 
                        isEdit 
                          ? (<>
                                <textarea className = "nameText"
                                  ref = {localInput}
                                  value = {localContent} //수정내용 기본값 설정
                                  onChange={(e) => setLocalContent(e.target.value)}
                                ></textarea>
                                  </>) :
                                  <>
                                    {name}
                                    </>
                      }
                    </div>
                    {
                      isEdit
                        ? (<>
                              <button className = "editButton" onClick ={handleEdit}>수정완료</button>
                        </>)
                        : <>
                              <button className = "editButton" onClick = {toggleIsEdit}>수정하기</button>
                        </>
                    }
            </div>
            <div className = "kakaoMain">
                <div className='kakaoIcon'><FontAwesomeIcon icon={faLock} size="lg" /></div><p className = "kakao">카카오계정 </p><div className="kakaoBox">{email}</div>
            </div>
            <div className = "likeMain">
                <div className='likeIcon'><FontAwesomeIcon icon={faHeartCircleCheck} size="lg" /></div><p className = "like">찜한 페스티벌 목록</p><div className="likeBox">{like}</div>
            </div>
            <div className = "postMain">
                <div className='postIcon'><FontAwesomeIcon icon={faPenToSquare} size="lg" /></div>
                <p className = "post">작성한 게시글</p>
                <div className="postBox">
                    {post && post.map((post)=>(<li key={post.pk} >
                    <input type = "checkbox" id = {post.pk} onChange = {e => {changeSingleBox(e.target.checked, String(e.target.id))}} 
                       className ="postCheck" style = {{display: isPostShown ? 'inline-block' : 'none'}}/><a href = "http://localhost:8000://festivalapp/post/:postID/">
                    {post.fields.title}</a></li>))}
                </div>
                <div className='controlButton' onClick = {controlPost}>{deleteButton}</div>
            </div>
            <div className = "replyMain">
                <div className='replyIcon'><FontAwesomeIcon icon={faComment} size="lg" /></div><p className = "reply">작성한 댓글</p>
                <div className="replyBox">
                    {reply && reply.map((reply)=>(<li key={reply.pk} >
                    <input type = "checkbox" id = {reply.pk} onChange = {e => {changeSingleBoxReply(e.target.checked, String(e.target.id))}} 
                       className ="replyCheck" style = {{display: isReplyShown ? 'inline-block' : 'none'}}/><a href = "http://localhost:8000://festivalapp/post/:postID/">
                    {reply.fields.comment}</a></li>))}
                  </div>
                <div className='controlButton' onClick = {controlReply} >{deleteButtonReply}</div>
            </div>
            <input type="button" value="로그아웃" style={{ margin: "20px" }} onClick ={logOut}></input>
        </div>
        
        </>
    );
};

export default Profile;