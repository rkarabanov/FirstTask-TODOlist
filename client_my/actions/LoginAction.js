import *as res from "../api/api"

export function loginAction(user) {
    return dispatch=>dispatch({
        type: "IS_LOGIN",
        payload:new Promise((resolve, reject)=>{res.login(user)
            .then((response)=>{
                resolve(response.data) })})
    })
}