import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

function DeletePost(){
    const params = useParams();

    deletePost(id){
        axios.delete(`${apiUrl}${params.postID}`)
    }
    
    handlingDelete = async (event) => { 
        await api.deletePost(event.target.value) //delete 완료 후에 새로고침 되도록 동기화 시킴
        this.getPosts() 
    }

    return ( 
        this.state.results.map((post) =>
            <div>
                <PostView
                    key = {post.id}
                    id = {post.id} title={post.title}
                    content={post.content} />
                <button
                    onClick={this.handlingDelete}>삭제하기</button> 
            </div>
        )
    )

            
    //글 삭제하기

    
}

export default DeletePost;