import *as res from "../api/api"

export function changeTaskStatus(data) {
    return dispatch=>dispatch({
        type: "CHANGE_TASK_STATUS",
        payload:new Promise((resolve, reject)=>{res.changeTaskStatus(data)
            .then((response)=>{
                resolve( response.data) })})
    })
}

export function addTask(data) {
    return dispatch=>dispatch({
        type: "ADD_TASK",
        payload:new Promise((resolve, reject)=>{res.addTask(data)
            .then((response)=>{
                resolve( response.data) })})
    })
}

export function removeTask(data) {
    return dispatch=>dispatch({
        type: "REMOVE_TASK",
        payload:new Promise((resolve, reject)=>{res.removeTask(data)
            .then((response)=>{
                resolve( response.data) })})
    })
}

export function getTasks(data) {
    return dispatch=>dispatch({
        type: "GET_TASKS",
        payload:new Promise((resolve, reject)=>{res.getUserTasks(data)
            .then((response)=>{
                resolve( response.data) })})
    })
}

    export function cleanTasks() {
        return dispatch=>dispatch({
            type: "CLEAN_TASKS"
        })
}


