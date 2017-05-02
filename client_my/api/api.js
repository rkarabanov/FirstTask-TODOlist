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
        console.log(data);
        return axios.post(adressServer + "/restorePass?id=" + id, data);
    },

    inSystem(jwtUser){
        // console.log(jwtUser);
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
        // console.log(data);
        return axios.post(adressServer + "/changeImage", data,{headers:{"Access-Control-Allow-Origin": "*"}})
    },
    changeTaskStatus(data){
        // console.log(id);
        return axios.post(adressServer + "/changeTaskStatus", data)
    },
    addNote(data){
        // console.log(data);
        return axios.post(adressServer + "/addNote", data)
    },
    addTask(data){
        // console.log(data);
        return axios.post(adressServer + "/addTask", data)
    },

}

