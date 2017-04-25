import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as userDB from './utils/UserDBUtils';
import * as valid from './validation/Validation';





const app = express();


userDB.setUpConnection();

let localStorage=null;

if (typeof localStorage === "undefined" || localStorage === null) {
    let LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}



app.use(bodyParser.json());

app.use(cors({origin: "*"}));


app.get('/login', (req, res) => {
        res.send();
});

app.get('/', function (req, res, next) {
    let api_key = 'key-f28652b259f1bbd5c3af8ecf102b9542';
    let domain = 'sandbox4a7d0a3570454aa89e20caa7674c319b.mailgun.org';
    let mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    let data = {
        from: 'Excited User <postmaster@sandbox4a7d0a3570454aa89e20caa7674c319b.mailgun.org>',
        to: '5600t0@gmail.com',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomness!'
    };

    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
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