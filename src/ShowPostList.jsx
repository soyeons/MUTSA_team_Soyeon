// import React , { useState, useEffect } from 'react';
// import {Link} from "react-router-dom";

// function ShowPostList(props) {

//     const initialPostList = {
//         header: [" ","제목","작성자","작성일","조회"],
//         data: [
//             {num:1, title: '싸이 흠뻑쇼 후기 남겨요!', writer: "choyeon2e", writeday: "2022.6.24", counts: 17},
//             {num:2, title: '스우파 콘서트 후기~', writer:"choyeons", writeday:"2022.7.13", counts:14 },
//         ],    
//     };

//     return (
//         <div id="center">
//             <div id="select">
//                 <Link to="/">
//                     <input type="buttonClick" value="후기 게시판"/>
//                 </Link>
//                 <Link to="/friends">
//                     <input type="button" value="친구 구하기 게시판"/>                      
//                 </Link>                  
//                 <Link to="/ticket">
//                     <input type="button" value="티켓 양도 게시판"/>
//                 </Link>
//                 <Link to="/inf">
//                     <input type="button" value="정보 공유 게시판"/>                    
//                 </Link>
//             </div>
//             <div>
//                 <div class="YellowSquare">
//                     <div class="PostList">
//                         <div class="Blank">
//                             <Link to = "/writepost">
//                                 <button class="writeBtn"> 작성하기 </button>                                
//                             </Link>
//                         </div>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <td>{initialPostList.header[0]}</td>
//                                     <td>{initialPostList.header[1]}</td>
//                                     <td>{initialPostList.header[2]}</td>
//                                     <td>{initialPostList.header[3]}</td>
//                                     <td>{initialPostList.header[4]}</td>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>{initialPostList.data[1].num}</td>
//                                     <td>{initialPostList.data[1].title}</td>
//                                     <td>{initialPostList.data[1].writer}</td>
//                                     <td>{initialPostList.data[1].writeday}</td>
//                                     <td>{initialPostList.data[1].counts}</td>
//                                 </tr>
//                                 <tr>
//                                         <td>{initialPostList.data[0].num}</td>
//                                         <td>{initialPostList.data[0].title}</td>
//                                         <td>{initialPostList.data[0].writer}</td>
//                                         <td>{initialPostList.data[0].writeday}</td>
//                                         <td>{initialPostList.data[0].counts}</td>                                    
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ShowPostList;