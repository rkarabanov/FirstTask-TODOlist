import enums from "../constans/Const"

export function loadComponentAction() {
    return dispatch=>dispatch({
        type: "TO_LOAD_REQUEST",
        payload:enums.LOAD_REQUEST
    })
}