import *as res from "../api/api"

export function checkToAccessRestore(id) {
    return dispatch=>dispatch({
        type: "CHECK_TO_ACCESS_RESTORE",
        payload:new Promise((resolve, reject)=>{res.checkToAccessRestore(id)
            .then((response)=>{
                resolve( response.data) })})
    })
}

export function restorePass(emailObj) {
    return dispatch=>dispatch({
        type: "RESTORE_PASSWORD",
        payload:new Promise((resolve, reject)=>{res.restorePass(emailObj)
            .then((response)=>{
                resolve( response.data) })})
    })
}