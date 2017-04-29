import *as res from "../api/api"

export function regAction(user) {
    return dispatch=>dispatch({
        type: "IS_REG",
        payload:new Promise((resolve, reject)=>{res.isReg(user)
            .then((response)=>{
                resolve( response.data) })})
    })
}