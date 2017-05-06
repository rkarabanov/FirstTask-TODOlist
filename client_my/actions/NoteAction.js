import * as res from "../api/api"
import promise from "./promisecallback"

export function changeTaskStatus(data) {
    return dispatch=>dispatch({
        type: "CHANGE_TASK_STATUS",
        payload:promise(res.changeTaskStatus,data)
    })
}

export function changeTask(data) {
    return dispatch=>dispatch({
        type: "CHANGE_TASK",
        payload:promise(res.changeTask,data)
    })
}

export function addTask(data) {
    return dispatch=>dispatch({
        type: "ADD_TASK",
        payload:promise(res.addTask,data)
    })
}

export function removeTask(data) {
    return dispatch=>dispatch({
        type: "REMOVE_TASK",
        payload:promise(res.removeTask,data)
    })
}

export function getTasks(data) {
    return dispatch=>dispatch({
        type: "GET_TASKS",
        payload:promise(res.getUserTasks,data)
    })
}

    export function cleanTasks() {
        return dispatch=>dispatch({
            type: "CLEAN_TASKS"
        })
}


