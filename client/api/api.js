import axios from 'axios';

let adressServer="http://localhost:8080";
export default {

    login(data){
        return axios.post(adressServer+"/login",data);
    }

}