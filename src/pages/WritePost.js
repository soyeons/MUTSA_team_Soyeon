import React, { Component } from 'react';
import RightWrite from './right/RightWrite';
import './WritePost.css';
import UploadFiles from '../UploadFiles';


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
        <select onChange={handleChange}>
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

class WritePost extends Component {

    render() {
        return (
            <div>
                <div class="arrange">
                    <RightWrite/>
                </div>
                <div class="forPD">
                    <div class="YellowSquare">
                        <div class="PostList">
                            <div class="upper">
                                <div class="selectBox">
                                    <SelectBox options={OPTIONS} defaultValue="후기 게시판"></SelectBox>
                                </div>
                                <div class="files">
                                    <UploadFiles/>                                
                                </div>
                            </div>
                            <div class="Writetitle">
                                <input type="text" className="txtTitle" name="title" placeholder='제목을 입력해 주세요.'/>
                            </div>
                            {/* <input type="file" accept="image/*" multiple/> */}

                            <div class="Writecontent">
                                <textarea class="txtContent" name="contents" placeholder='내용을 입력하세요'></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default WritePost;