import {atom, selector} from 'recoil';

export const postListAtom = atom({
    key: "postList",
    default: [],
});

export const setPagesAtom = atom({
    key:"pages",
    default:[],
});

export const setPageAtom = atom({
    key:"page",
    default:1,
});

export const isValidAtom = atom({
    key:"isValid",
    default:false,
});

export const postSelector = selector({
    key:"postSelector",
    get:async({get})=>{
        //여기 채워넣기
    }
});

export const replSelector = selector({
    key:"replSelector",
    get:async({get})=>{
        //여기 채워넣기
    }
});

export let finalValueAtom = atom({
    key:"finalValue",
    default:null,
});