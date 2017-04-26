import {browserHistory} from 'react-router'
import "babel-polyfill";


const initialState = {
    msg: "Пожалуйста авторизируйтесь!",
    userInSystem: {},
    errorToAccess:true,
    forgotMsg:""
};

export default  function reduce(state = initialState, action) {

    switch (action.type) {
        case 'CHECK_TO_ACCESS_RESTORE_FULFILLED':
            console.log(action.payload);
            if(action.payload){
                console.log("All ok");
                return {...state,errorToAccess:false};
            }else {
                console.log("errorToAccess:true");
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

            // browserHistory.push("/login");
            return {...state,forgotMsg:action.payload?"Успех! Проверьте свой почтовыыйы ящик":"Вы ввели невверные данные"};
            break;
        case 'IS_LOGIN_FULFILLED':
            if (typeof action.payload == 'string') {
                return {...state, msg: action.payload};
            }
            else {
                browserHistory.push("/dashboard");
                console.log(action.payload);
                return {...state, msg: "Пожалуйста авторизируйтесь!", userInSystem: action.payload}
            }
            break;
        default:
            return state;
    }
}