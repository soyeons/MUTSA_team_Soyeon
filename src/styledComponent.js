import styled from 'styled-components';

export const MediaDiv = styled.div`
    margin: 0px auto;
    min-height: 100vh;
    width: 80%;
    background-color: whitesmoke;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

export const LoginWrapper = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border : 5px solid black;
    font-family: 'Black Han Sans', sans-serif;
    background-color : white;
`;

export const Emoji = styled.div`
    font-size : 100px;
    padding : 50px;
`

export const Header = styled.span`
    font-size: 40px;
    padding : 20px;
`;

export const SubHeader = styled.span`
    font-size : 30px;
    padding : 10px;
`

export const KakaoBtn = styled.div`
    background-image: url("img/kakao_login_medium_narrow.png");
    background-repeat: no-repeat;
    background-size : cover;
    background-color : yellow;
    margin: 10px auto;
    color: black;
    font-size : 30px;
    width: 300px;
    height: 100px;
    border : 2px solid black;
`;

