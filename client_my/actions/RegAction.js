import * as res from "../api/api"
import promise from "./promisecallback"
export function regAction(user) {
    return dispatch=>dispatch({
        type: "IS_REG",
        payload:promise(res.isReg,user)
    })
}