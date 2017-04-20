import *as res from "../api/api"
import { browserHistory } from 'react-router'
const initialState = {
    msg:""
};


export default function login(state = initialState, action) {
    switch (action.type) {
        case 'IS_LOGIN':
            res.login(action.payload).then(function(response){
                if(response.data.length==0){
                return {...state, msg:"Ошибка ввода: Неверной email/пароль"};}
                else{
                browserHistory.redirect("/dashboard");
        }});
        default:
            return state;
    }
}