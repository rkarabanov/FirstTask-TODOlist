import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as userDB from './utils/UserDBUtils';
import * as valid from './validation/Validation';

const app = express();

userDB.setUpConnection();

let localStorage=null;

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

app.use(bodyParser.json());

app.use(cors({origin: "*"}));


app.get('/login', (req, res) => {
        res.send();
});

app.post('/login', (req, res) => {
    userDB.find(req.body).then((data) => {
        if(data.length!=0){
            localStorage.setItem('userInSystem', data[0]);
            console.log(req.body);
            res.send(data[0]);
        }
        else{
            console.log(req.body);
            res.send("Ошибка ввода: Неверной email/пароль"
            );}
        });

});

app.get('/dashboard', (req, res) => {
    res.send();
});


const server = app.listen(8080, () => {
    console.log(`Server is up and running on port 8080`);
});