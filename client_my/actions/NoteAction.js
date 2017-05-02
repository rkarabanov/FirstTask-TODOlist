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

export function addNote(data) {
    return dispatch=>dispatch({
        type: "ADD_NOTE",
        payload:new Promise((resolve, reject)=>{res.addNote(data)
            .then((response)=>{
                resolve( response.data) })})
    })
}