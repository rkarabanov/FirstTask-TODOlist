import *as res from "../api/api"
import { browserHistory } from 'react-router'
const initialState = {
    msg:""
};


export default function login(state = initialState, action) {
    switch (action.type) {
        case 'IS_LOGIN':
        //     res.login(action.payload).then(function(response){
        //         if(response.data=="Ошибка ввода: Неверной email/пароль"){
        //             console.log(response.data);
        //         return {...state, msg:response.data};}
        //         else{
        //         browserHistory.push("/dashboard");
        //             return {...state,user:response.data};
        // }})
            let msg=res.login(action.payload).then(function(response){return response.data});
           

            return {...state, msg:""+msg};
            ;
        default:
            return state;
    }
}