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

export const Chomoji = styled.div`
    font-size: 40px;
    padding: 20px;
    padding-top: 30px;
    padding-left: 40px;
    position: absolute;
`

export const Qlist = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 600;
    position: absolute;
    margin-top: 50px;
    padding-left: 100px;
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

export const ReplWriter = styled.div`
    width: 50px;
    height: 50px;
    position: absolute;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    font-size: 14px;
`;

export const PostReplDiv = styled.div`
`;

export const Repl = styled.div`
    width: 1050px;
    height: 50px;
    margin-left: 90px;
    padding-left: 25px;
    padding-right: 150px;
    overflow: auto;
    resize: none;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 500;
    font-size: 14px;
    
`;