import * as res from "../api/api"
import promise from "./promisecallback"

export function changePass(data) {
    return dispatch=>dispatch({
        type: "CHANGE_PASS",
        payload:promise(res.changePass(data))
    })
}

export function changeImage(data) {
    return dispatch=>dispatch({
        type: "CHANGE_IMAGE",
        payload:promise(res.changeImage(data))
    })
}

export function changeEmail(data) {
    return dispatch=>dispatch({
        type: "CHANGE_EMAIL",
        payload:promise(res.changeEmail(data))
    })
}