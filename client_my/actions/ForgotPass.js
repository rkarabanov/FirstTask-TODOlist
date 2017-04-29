import *as res from "../api/api"

export function sendInstructions(email) {
    return dispatch=>dispatch({
        type: "SEND_INSTRUCTIONS",
        payload:new Promise((resolve, reject)=>{res.sendIns(email)
            .then((response)=>{
                resolve( response.data) })})
    })
}

export function backupInformation() {
    return dispatch=>dispatch({
        type: "BACKUP_INFORMATION"
    })
}