import * as res from "../api/api"
import promise from "./promisecallback"
export function downloadExcel(data) {
    return dispatch=>dispatch({
        type: "DOWNLOAD_EXCEL",
        payload:promise(res.downloadExcel,data)
    })
}