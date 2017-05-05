import {browserHistory} from 'react-router'
import "babel-polyfill"
import enums from "../constans/Const"
import fileSaver from "file-saver";
import initialState from "../store/initialState"


export default  function reduce(state = initialState, action) {
    switch (action.type) {
        case "CLEAN_TASKS":
            return {...state, tasks: []};
            break;

        case "CLEAN_USERS":
            return {...state, allUsers: []};
            break;

        case "DOWNLOAD_EXCEL_FULFILLED":{
            let data=action.payload;
            let blob = new Blob([base64ToArrayBuffer(data)]);
            function base64ToArrayBuffer (base64) {
                let binary_string = window.atob(base64);
                let len = binary_string.length;
                let bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    bytes[i] = binary_string.charCodeAt(i);
                }
                return bytes.buffer;
            }
            fileSaver.saveAs(blob, 'todolist.xlsx');
            return {...state};
        }
        break;
        case 'ADD_TASK_FULFILLED':
        case 'REMOVE_TASK_FULFILLED':{
            let data = action.payload;
            if (typeof data === 'string') {
                return {...state, information: data,loadingStatus: enums.LOAD_USER_FAIL};
            }
            else {
                console.log(data);
                return {
                    ...state,
                    information: "",
                    tasks:data,
                    loadingStatus: enums.LOAD_USER_SUCCESS
                }
            }}
            break;

        case 'IS_IN_SYSTEM_FULFILLED': {
            let response = action.payload;
            console.log(response);
            if (response.success) {
                document.cookie = "jwtUser=" + response.token + ";";
                return {...state, loadingStatus: enums.LOAD_USER_SUCCESS, userInSystem: response.user};
            } else {
                return {...state, loadingStatus: enums.LOAD_USER_FAIL};
            }
        }
        case 'TO_LOAD_REQUEST':
            return {...state, loadingStatus: action.payload};
            break;

        case 'GET_TASKS_FULFILLED':
        case 'CHANGE_TASK_STATUS_FULFILLED':{
            let data = action.payload;
            if (typeof data === 'string') {
                return {...state, information: data,loadingStatus: enums.LOAD_USER_FAIL};
            }
            else {
                console.log(data);
                return {
                    ...state,
                    information: "",
                    tasks:data,
                    loadingStatus: enums.LOAD_USER_SUCCESS
                }
            }}
            break;

        case 'EXIT_USER':{
            let cook="";
            let arrCookie=document.cookie.split(";");
            for (let cookie of arrCookie){
                if(cookie.split("=")[0]!=="jwtUser"&&cookie.split("=")[0]!==" jwtUser"){
                    cook=cookie+";";
                }
                else{
                    cook="jwtUser=;"
                }
            }
            document.cookie=cook;
            return {...state, loadingStatus: enums.LOAD_USER_FAIL, userInSystem:{}};}
            break;

        case 'BACKUP_INFORMATION':
            return {...state, information: ""};
            break;

        case 'CHECK_TO_ACCESS_RESTORE_FULFILLED':
            console.log(action.payload);
            if (action.payload) {
                return {...state, errorToAccess: false};
            } else {
                return {...state, errorToAccess: true};
            }
            break;

        case 'RESTORE_PASSWORD_FULFILLED':
            if (action.payload) {
                browserHistory.push("/login");
                return {...state, errorToAccess: true};
            } else {
                return {...state, errorToAccess: true};
            }
            break;

        case 'SEND_INSTRUCTIONS_FULFILLED':
            return {
                ...state,
                information: action.payload ? "Успех! Проверьте свой почтовый ящик на наличие инструкций" : "Неверный email или вы входили с Google или ошибка на сервере"
            };
            break;
        case 'IS_LOGIN_FULFILLED':
        case 'IS_REG_FULFILLED':
        case 'CHANGE_EMAIL_FULFILLED':
        case 'CHANGE_IMAGE_FULFILLED':
        case 'CHANGE_PASS_FULFILLED':{
            let data = action.payload;
            console.log(data);
            if (typeof data === 'string') {
                return {...state, information: data};
            }
            else {

                console.log(data);
                document.cookie = "jwtUser=" + data.token + ";";
                // onCheck.log(document.cookie);
                let info=data.information===undefined?"":data.information;
                return {
                    ...state,
                    information: info,
                    userInSystem: data.user,
                    loadingStatus: enums.LOAD_USER_SUCCESS,
                }
            }
            }
            break;
        case 'GET_ALL_USERS_FULFILLED':{
            let data = action.payload;
            if (typeof data === 'string') {
                return {...state, information: data};
            }
            else {
                // console.log(data);
                return {
                    ...state,
                    information: "",
                    allUsers:data,
                    loadingStatus: enums.LOAD_USER_SUCCESS
                }
            }}
            break;
        default:
            return {...state};
    }
}