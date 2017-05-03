import *as res from "../api/api"

export function cleanUsers() {
    return dispatch=>dispatch({
        type: "CLEAN_USERS"
    })
}

export function getAllUsers(data) {
    return dispatch=>dispatch({
        type: "GET_ALL_USERS",
        payload:new Promise((resolve, reject)=>{res.getAllUsers(data)
            .then((response)=>{
                resolve( response.data) })})
    })
}
