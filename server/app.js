import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as userDB from './utils/UserDBUtils';
import * as forgotPassDB from './utils/ForgotPassDBUtils';
import * as valid from '../client_my/validation/Validation';




const app = express();
const nodemailer  = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '5600t0@gmail.com',
        pass: '3455961536263Rk'
    }
});

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

app.post('/sendInsructions', function (req, res) {
    userDB.findByEmail(req.body).then((data)=>{
        if(data.length==0){
            res.send("error");
        }else{
        forgotPassDB.removeByEmail(req.body).then(()=>{
            forgotPassDB.createForgotPass(req.body).then((data)=>
                {
                    console.log(data);
                    let id=data._id;
                    let mailOptions = {
                        from: '"R-key" <5600t0@gmail.com>', // sender address
                        to: ''+req.body.email, // list of receivers
                        subject: 'Hello ✔', // Subject line
                        text: 'Hello world ?', // plain text body
                        html: '<div><b>Если вы хотите изметь ваш парль, то пройдите по ссылке внизу</b>' +
                        '<a href="http://localhost:8090/restorePass?id=' +
                        id +
                        '">Ссылка</a></div> ' // html body
                    };

// send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {

                            res.send("error");
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                        res.send('success');

                    });
                }
            );
        });
    }})

});

app.post('/login', (req, res) => {
    if(!valid.isValidateEmail(req.body.email)){res.send("Ошибка ввода: Некорректный email")}
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

app.post('/sendInsructions',(req,res)=>{
    console.log(req.body);
    res.send("Ошибка ввода: Неверной email/пароль");
});

app.get('/dashboard', (req, res) => {
    res.send();
});


const server = app.listen(8080, () => {
    console.log(`Server is up and running on port 8080`);
});