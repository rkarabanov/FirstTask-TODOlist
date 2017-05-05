import *as res from "../api/api"
import promise from "./promisecallback"

export function sendInstructions(email) {
    return dispatch => dispatch({
        type: "SEND_INSTRUCTIONS",
        payload: promise(res.sendIns, email)
    })
}

export function backupInformation() {
    return dispatch => dispatch({
        type: "BACKUP_INFORMATION"
    })
}