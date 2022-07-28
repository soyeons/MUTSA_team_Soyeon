import React from 'react';
import { 
    MediaDiv,
    LoginWrapper,
    Emoji,
    Header,
    SubHeader,
    KakaoBtn } from './styledComponent';

import { KAKAO_CLIENT_ID, REDIRECT_URL } from './KakaoLoginData';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;


const Login = () => {

    const handleLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    return (
        <MediaDiv>
            <LoginWrapper>
                <Emoji> 🎉 </Emoji>
                <Header> 반갑습니다! </Header>
                <SubHeader>당신의 페스티벌 취향을 찾아, 페스티발람</SubHeader>
                <KakaoBtn onClick = {handleLogin}>카카오로 로그인</KakaoBtn>
                
             

            </LoginWrapper>
        </MediaDiv>
    );
};

export default Login;