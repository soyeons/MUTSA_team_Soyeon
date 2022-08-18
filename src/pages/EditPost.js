// import React,{Component} from "react";
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function EditPost({apiUrl}){
//     const params=useParams();
//     const getModifyData = async (id) => {
//         const getData = await axios(`${apiUrl}${params.postID}`,{
//             method: 'POST',
//             headers: new Headers(),
//             data: {id:id}
//         });

//         this.setState({
//             title: getData.data[0].title,
//             body: getData.data[0].body
//         });
//     }
// }

// export default EditPost;
