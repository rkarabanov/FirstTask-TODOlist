import *as res from "../api/api"

export function downloadExcel(data) {
    return dispatch=>dispatch({
        type: "DOWNLOAD_EXCEL",
        payload:new Promise((resolve, reject)=>{res.downloadExcel(data)
            .then((response)=>{
                resolve( response.data) })})
    })
}