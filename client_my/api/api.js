import axios from 'axios';
import "babel-polyfill";
let adressServer = "http://localhost:8080";
export default {

    login(data){
        return axios.post(adressServer + "/login", data);
    },

    sendIns(data){
        return axios.post(adressServer + "/sendInsructions", data);
    },

    checkToAccessRestore(id){
        return axios.get(adressServer + "/restorePass?id=" + id
            // , {headers:{Authorization:"Basic "+"HEYQ!"}}
        );
    },

    restorePass(id, data){
        // console.log(data);
        return axios.post(adressServer + "/restorePass?id=" + id, data);
    },

    inSystem(jwtUser){
        // onCheck.log(jwtUser);
        return axios.post(adressServer + "/checkJwt", jwtUser);
    },

    isReg(user){
        return axios.post(adressServer + "/reg", user);
    },

    changePass(data){
        return axios.post(adressServer + "/changePass", data)
    },

    changeEmail(data){
        return axios.post(adressServer + "/changeEmail", data)
    },

    changeImage(data){
        // onCheck.log(data);
        return axios.post(adressServer + "/changeImage", data, {headers: {"Access-Control-Allow-Origin": "*"}})
    },
    changeTaskStatus(data){
        return axios.post(adressServer + "/changeTaskStatus", data)
    },
    changeTask(data){
        return axios.post(adressServer + "/changeTask", data)
    },
    addTask(data){
        // onCheck.log(data);
        return axios.post(adressServer + "/addTask", data)
    },
    getUserTasks(data){
        return axios.post(adressServer + "/getTasks", data);
    },
    removeTask(data){
        return axios.post(adressServer + "/removeTask", data);
    }, getAllUsers(data){
        return axios.post(adressServer + "/getAllUsers", data);
    },
    downloadExcel(data){
        return axios.post(adressServer + "/getXlsx", data);
    },


}

