import {browserHistory} from 'react-router'
import "babel-polyfill";

const initialState = {
    msg: "Пожалуйста авторизируйтесь!",
    userInSystem: {},
    errorToAccess:true,
    information:false
};

export default  function reduce(state=initialState, action) {

    switch (action.type) {
        case 'CHECK_TO_ACCESS_RESTORE_FULFILLED':
            console.log(action.payload);
            if(action.payload){
                return {...state,errorToAccess:false};
            }else {
                return {...state,errorToAccess:true};
            }
            break;
        case 'RESTORE_PASSWORD_FULFILLED':
            if(action.payload){
                browserHistory.push("/login");
                return {...state,errorToAccess:true};
            }else{
                return {...state,errorToAccess:true};
            }
            break;
        case 'SEND_INSTRUCTIONS_FULFILLED':
            console.log(action.payload);

            browserHistory.push("/info");
            
            return {...state,information:action.payload?"Успех! Проверьте свой почтовый ящик на наличие инструкций":"Неверный email или ошибка на сервере"};
            break;
        case 'IS_LOGIN_FULFILLED':
            let user=action.payload;
            if (typeof user == 'string') {
                return {...state, msg: action.payload};
            }
            else {
                browserHistory.push("/dashboard");
                console.log(user);
                return {...state, msg: "Пожалуйста авторизируйтесь!", userInSystem: user}
            }
            break;
        default:
            return {...state};
    }
}