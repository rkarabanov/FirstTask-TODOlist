import {browserHistory} from 'react-router'
import "babel-polyfill";
import enums from "../constans/Const"

const initialState = {
    msg: "Пожалуйста авторизируйтесь!",
    errorToAccess: true,
    information: false,
    userInSystem: {},
    loadingStatus: enums.LOAD_REQUEST
};

export default  function reduce(state = initialState, action) {

    switch (action.type) {
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
            console.log(action.payload);
            return {...state, loadingStatus: action.payload};
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
            console.log(action.payload);

            browserHistory.push("/info");

            return {
                ...state,
                information: action.payload ? "Успех! Проверьте свой почтовый ящик на наличие инструкций" : "Неверный email или ошибка на сервере"
            };
            break;
        case 'IS_LOGIN_FULFILLED':
            let data = action.payload;
            if (typeof data == 'string') {
                return {...state, msg: action.payload};
            }
            else {

                console.log(data);
                document.cookie = "jwtUser=" + data.token + ";";
                console.log(document.cookie);
                // browserHistory.push("/dashboard");
                return {
                    ...state,
                    msg: "Пожалуйста авторизируйтесь!",
                    userInSystem: data.user,
                    loadingStatus: enums.LOAD_USER_SUCCESS
                }
            }
            break;
        default:
            return {...state};
    }
}