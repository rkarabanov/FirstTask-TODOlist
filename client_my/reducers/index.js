import *as res from "../api/api"
import {browserHistory} from 'react-router'
import "babel-polyfill";
const initialState = {
    msg: "Пожалуйста авторизируйтесь!",
    userInSystem: {}
};

export default  function reduce(state = initialState, action) {

    switch (action.type) {
        case 'IS_LOGIN_FULFILLED':
            if (typeof action.payload == 'string') {
                return {...state, msg: action.payload};
            }
            else {
                browserHistory.push("/dashboard");
                return {...state, msg: "Пожалуйста авторизируйтесь!", userInSystem: action.payload}
                console.log(state.userInSystem);
            }
            break;
        default:
            return state;
    }
}