import {browserHistory} from 'react-router'
import "babel-polyfill";


const initialState = {
    msg: "Пожалуйста авторизируйтесь!",
    userInSystem: {}
};

export default  function reduce(state = initialState, action) {

    switch (action.type) {
        case 'CHECK_TO_ACCESS_RESTORE_FULFILLED':
            console.log(action.payload);
            if(action.payload==true){
                console.log("All ok");
                return {...state,errorToAccess:false};
            }else {
                console.log("errorToAccess:true");
                return {...state,errorToAccess:true};
            }
            break;
        case 'RESTORE_PASSWORD_FULFILLED':
            if(action.payload=="true"){
                browserHistory.push("/login");
                return {...state};
            }
            break;
        case 'SEND_INSTRUCTIONS_FULFILLED':
            console.log(action.payload);
            return {...state};
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