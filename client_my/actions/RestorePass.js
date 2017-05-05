import *as res from "../api/api"
import promise from "./promisecallback"

export function checkToAccessRestore(id) {
    return dispatch=>dispatch({
        type: "CHECK_TO_ACCESS_RESTORE",
        payload:promise(res.checkToAccessRestore,id)

    })
}

export function restorePass(id,emailObj) {
    return dispatch=>dispatch({
        type: "RESTORE_PASSWORD",
        payload:promise(res.restorePass,id,emailObj)
            
    })
}