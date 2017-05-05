import *as res from "../api/api"
import promise from "./promisecallback"

export function cleanUsers() {
    return dispatch=>dispatch({
        type: "CLEAN_USERS"
    })
}

export function getAllUsers(data) {
    return dispatch=>dispatch({
        type: "GET_ALL_USERS",
        payload:promise(res.getAllUsers,data)
    })
}
