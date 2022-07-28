import React from 'react';
import { useNavigate } from 'react-router-dom';


function EachPost({title, postID, writer, writeday, counts}){

    const navigate = useNavigate();

    const goPost = () => {
        navigate(`${window.location.pathname + '/post/' + postID }`);
    };

    return(
        <tbody>
            <tr>
                <td>{postID}</td>
                <td class="titleClick" onClick={goPost}>{title}</td>
                <td>{writer}</td>
                <td>{writeday}</td>
                <td>{counts}</td>
            </tr>
        </tbody>
    );
};


export default EachPost;