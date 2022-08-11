// import React, {useState} from 'react';
// import SingleComment from './SingleComment';
// import './Comment.css'

// // const [userName] = useState('user_id');
// // const [comment, setComment] = useState('');
// // let [feedComments, setFeedComments] = useState([]);
// // let [isValid, setIsValid] = useState(false);


// class Comment extends React.Component{



//     constructor(props){
//         super(props);
//         this.state={
//             comments: [
//                 {
//                     uuid:0,
//                     writer: "",
//                     date:"",
//                     content:""
//                 },
//             ]
//         }
//         this.addComment = this.addComment.bind(this);
//     }
//     addComment(){
//         let value = document.querySelector("#newCommentContent").value;
//         this.setState({comments: [...this.state.comments, {
//             uuid: this.state.comments.length + 1,
//             writer: "user_id",
//             date: new Date().toISOString().slice(0,10),
//             content: value
//         }]})
//     }

//     render(){
    
//         return(
//             <div id="root">
//                 <div>
//                     <div> user_id</div>
//                     <div id="writingArea">
//                         <textarea id="newCommentContent" 
//                             spellcheck="false" className="replSpace" 
//                             placeholder="댓글을 입력하세요..." cols="180" rows="3"
//                             onChange={e => {
//                                 setComment(e.target.value);
//                             }}
//                             onKeyUp={e => {
//                                 e.target.value.length > 0
//                                     ? setIsValid(true)
//                                     : setIsValid(false);
//                             }}>
//                         </textarea>
//                         <button 
//                                     type="button"
//                                     id="submitNewComment"
//                                     className="registBtn"
//                                     onClick={this.addComment}
//                                     disabled={isValid ? false : true}
//                                 >등록하기</button>
//                     </div>
//                     <ul id="comments">
//                         {
//                             this.state.comments.map(comment => {
//                                 return <SingleComment key={comment.uuid} comment={comment}/>
//                             })
//                         }
//                     </ul>
//                 </div>
//             </div>
//         )
//     }
// }

// export default Comment;