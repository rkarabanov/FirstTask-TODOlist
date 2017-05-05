import *as res from "../api/api"
import promise from "./promisecallback"

export function loginAction(user) {
    return dispatch=>dispatch({
        type: "IS_LOGIN",
        payload:promise(res.login,user)
            // new Promise((resolve, reject)=>{res.login(user)
            // .then((response)=>{
            //     resolve( response.data) })})
    })
}

export function isInSystem() {
    return dispatch=>dispatch({
        type: "IS_IN_SYSTEM",
        payload:new Promise((resolve, reject)=>{
            console.log("I'm here");
            let jwtUser="";
            let arrCookie=document.cookie.split(";");
            for (let cookie of arrCookie){
                if(cookie.split("=")[0]=="jwtUser"||cookie.split("=")[0]==" jwtUser"){
                    jwtUser=cookie.split("=")[1];
                    console.log(jwtUser);
                    break;
                }
            }
            res.inSystem({token:jwtUser})
            .then((response)=>{
                resolve( response.data) })})
    })
}