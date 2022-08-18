import React, { createContext, useState } from "react";

const userContext = createContext({
    user: { kakaoId : "", name: "", email: "", like: "", 
    post:"", 
    reply: "",
    logined : false },
    setUser: () => {}
});

export default userContext;
