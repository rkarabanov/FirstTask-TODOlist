import {browserHistory} from 'react-router'
import "babel-polyfill";


const initialState = {
    msg: "Пожалуйста авторизируйтесь!",
    userInSystem: {}
};

export default  function reduce(state = initialState, action) {

    switch (action.type) {
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