import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as userDB from './utils/UserDBUtils';
import * as valid from './validation/Validation';

const app = express();

userDB.setUpConnection();

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

app.use(bodyParser.json());

app.use(cors({origin: "*"}));


app.get('/login', (req, res) => {
    let error=req.get("error");
    console.log(error);
    (error!=undefined&&error!=null)?res.send(error):res.send();
});

app.post('/login', (req, res) => {
    userDB.find(req.body).then((data) => {
        if(data.length==0){
            res.set("error","Ошибка! Неверные и/или логин/пароль");
            res.redirect('/login');
        }
        else{
            localStorage.setItem('userInSystem', data[0]);
            res.redirect('/dashboard');
        }
        });
});

app.get('/dashboard', (req, res) => {
    res.send();
});


const server = app.listen(8080, () => {
    console.log(`Server is up and running on port 8080`);
});