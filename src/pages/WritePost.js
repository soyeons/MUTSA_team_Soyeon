import React, { useState, useEffect } from 'react';
import './WritePost.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OPTIONS = [
    {value: "review", name:"후기 게시판"},
    {value: "friends", name:"친구 구하기 게시판"},
    {value: "ticket", name:"티켓 양도 게시판"},
    {value: "inf", name:"정보 공유 게시판"},
]


const SelectBox = (props) => {

    const handleChange = (e) => {
        console.log(e.target.value);
    };

    return(
        <select className="writeSelect" onChange={handleChange}>
            {props.options.map((option)=>{
                return <option
                    key={option.value}
                    value={option.value}
                    defaultValue={props.defaultValue === option.value}
                >
                    {option.name}
                </option>
            })}
        </select>
    );
};

const SubmitComponent = React.memo(({onSubmit})=>(
    <button onClick={onSubmit} className="write">등록</button>
));

function WritePost({apiUrl}){

    const [inputs,setInputs] = useState({
        title : '',
        contents : '',
    });
    const {title, contents} = inputs;

    const testw = 1;

    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    // const selectUrl = document.getElementsByClassName('writeSelect');
    
    // 셀렉트박스 value를 가져와서 등록 눌렀을 때 navigate로 해당 게시판 연결되게 하고싶은데
    // 방법을 모르겟음.

    // const onSubmit = () => {
    //     axios.post(`${apiUrl}posts/`, {
    //         title: inputs.title,
    //         contents: inputs.contents,
    //         repls: [],
    //     }).then(response => {
    //         console.log(response);
    //     })
    //     navigate('../review');
    // }
    const onSubmit = () => {
        axios.post(`http://localhost:8000/festivalapp/posts/`, {
            title: inputs.title,
            body: inputs.contents,
            image: null,
            category: "후기",
        }).then(response => {
            console.log(response);
        })
        navigate('../review');
    }

    return (

        <div>
            <div className="arrange">
                <SubmitComponent onSubmit = {onSubmit}/>
            </div>
            <div className="forPD">
                <div className="YellowSquare">
                    <div className="PostList">
                        <div className="upper">
                            <div className="selectBox">
                                <SelectBox options={OPTIONS} defaultValue="후기 게시판"></SelectBox>
                            </div>
                            <div className="files">
                                <input type="file"></input>
                                {/* 수정 필요함 */}
                            </div>
                        </div>
                        <div className="Writetitle" testw={testw}>
                            {/* <div className='InputPost'></div> */}
                            <input type="text" onChange={onChange} value={title} className="txtTitle" name="title" placeholder='제목을 입력해 주세요.'/>
                        </div>
                        <div className="Writecontent">
                            <textarea onChange={onChange} value={contents} className="txtContent" name="contents" placeholder='내용을 입력하세요'></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
    
}

export default WritePost;