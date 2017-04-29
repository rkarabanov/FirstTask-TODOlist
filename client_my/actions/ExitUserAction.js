import *as res from "../api/api"

export function exitUser(email) {
    return dispatch=>dispatch({
        type: "EXIT_USER"
    })
}