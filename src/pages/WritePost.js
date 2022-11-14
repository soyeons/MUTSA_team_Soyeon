import React, { useState, useContext } from 'react';
import './WritePost.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './../Nav';
import userContext from './../context/index';
import { useRecoilState } from 'recoil';
import { finalValueAtom } from './atoms';

const OPTIONS = [
  { value: 'review', name: '후기 게시판' },
  { value: 'friends', name: '친구 구하기 게시판' },
  { value: 'ticket', name: '티켓 양도 게시판' },
  { value: 'inf', name: '정보 공유 게시판' }
];

function WritePost(){
    const [finalValue, setfinalValue] = useRecoilState(finalValueAtom);
    const context= useContext(userContext);
    const [name] = useState(context.user.name);

    // let finalValue = null;

    const SelectBox = (props) => {
        // const handleChange = (e) => {
        //     finalValue = e.target.value;
        // };

        const handleChange = (e) =>{
            setfinalValue(e.target.value);
        }
    
        return(
            <select className="writeSelect" id="writeSelect" onChange={handleChange}>
                <option>게시판을 선택하세요--</option>
                {props.options.map((option)=>{
                    return <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.name}
                    </option>
                })}
            </select>
        );
    };

    const [inputs,setInputs] = useState({
        title : '',
        body : '',
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

    const onSubmit = () => {
        axios.post(`http://172.17.195.227:8000/festivalapp/post/create/`, {
            title: inputs.title,
            body: inputs.contents,
            username: name,
            author: "익명",
            category: finalValue,
            repls: [],
            }).then(()=>{
            window.location.reload(); //등록버튼 누르고 바로 페이지 새로고침
            })
            navigate('../review');
        }

    const SubmitComponent = React.memo(({onSubmit})=>(
        <button onClick={onSubmit} className="write">
            등록
        </button>
    ));

    return (
        <div id="center">
            <nav><Navbar/></nav>
            <div>
                <div className='arrange'>
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
                                <input type="text" onChange={onChange} value={title} className="txtTitle" name="title" placeholder='제목을 입력해 주세요.'/>
                            </div>
                            <div className="Writecontent">
                                <textarea onChange={onChange} value={contents} className="txtContent" name="contents" placeholder='내용을 입력하세요'></textarea>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    );
    
}

export default WritePost;