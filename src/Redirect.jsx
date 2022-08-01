import React, { useEffect } from 'react';
import { KAKAO_CLIENT_ID, REDIRECT_URL } from './KakaoLoginData';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CSRFToken from './csrftoken';

const Redirect = () => {
    const PARAMS = new URL(document.location).searchParams;
    const navigate = useNavigate();
    const KAKAO_CODE = PARAMS.get('code');

    console.log(PARAMS.get('code'));

    /*
    const sendAccessCode = () => {
        axios({
            url : 'http://172.20.10.4:8000/accounts/kakao/callback/',
            method : "POST",
            data : {'code' : KAKAO_CODE},
            headers : {"X-CSRFToken" : CSRFToken},
            xsrfHeaderName: "X-CSRFToken",
            }
        ).then(response => {console.log(response.data);})}
    */

    
    const sendAccessCode = () => { /*인가코드*/
        axios.post(`http://172.20.10.4:8000/accounts/kakao/callback/`, 
        {
            code : KAKAO_CODE,}).then(response => {
              console.log(response.data);
              console.log("보내기 성공 :)")
        },  
        {xsrfCookieName: 'csrftoken', xrfHeaderName: 'X-CSRFToken'})
    }
    
    

    const getKaKaoToken = () => {
        fetch(`https://kauth.kakao.com/oauth/token` ,{
            method : 'POST',
            headers : { 'Content-Type' : 'application/x-www-form-urlencoded'},
            body : `grant_type=authorization_code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&code=${KAKAO_CODE}`,
        })
        .then(res => res.json())
        .then(data => {
            if (data.access_token) {
                localStorage.setItem('token',data.access_token);
            } else {
                navigate('/');
            }
        });
    };

    useEffect(() => {
        if(!PARAMS) return;
        console.log("왜 날...")
        sendAccessCode();
        //getKaKaoToken();
    },[]);

    return (

        <div>
            카카오 로그인 리다이렉트 화면입니다. 
        </div>
    );
};

export default Redirect;