import React, { Component } from 'react';
import '../WritePost.css';


class RightWrite extends Component {

    render(){
        return(
            <div>
                <button class="write">등록</button>
            </div>
        );
    }

    // _submitBoard = async function(){
    //     const title = document.getElementsByName('title')[0].ariaValueMax.trim();
    //     const contents = document.getElementsByName('contents')[0].value.trim();
    
    //     if (title===""){
    //         return alert("제목을 입력해주세요.");
    //     }
    
    //     else if (contents===""){
    //         return alert("내용을 입력해주세요. ");
    //     }
    
    //     const data = { title : title, contents : contents };
    // }
}



export default RightWrite;