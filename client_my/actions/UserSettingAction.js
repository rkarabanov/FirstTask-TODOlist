import *as res from "../api/api"

export function changePass(data) {
    return dispatch=>dispatch({
        type: "CHANGE_PASS",
        payload:new Promise((resolve, reject)=>{res.changePass(data)
            .then((response)=>{
                resolve( response.data) })})
    })
}

export function changeImage(data) {
    return dispatch=>dispatch({
        type: "CHANGE_IMAGE",
        payload:new Promise((resolve, reject)=>{res.changeImage(data)
            .then((response)=>{
                resolve( response.data) })})
    })
}

export function changeEmail(data) {
    return dispatch=>dispatch({
        type: "CHANGE_EMAIL",
        payload:new Promise((resolve, reject)=>{res.changeEmail(data)
            .then((response)=>{
                resolve( response.data) })})
    })
}