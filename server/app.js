import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as userDB from './utils/UserDBUtils';
import * as forgotPassDB from './utils/ForgotPassDBUtils';
let session = require('express-session');

const morgan = require('morgan');

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const app = express();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '5600t0@gmail.com',
        pass: '3455961536263Rk'
    }
});

userDB.setUpConnection();


app.use(bodyParser.json({limit: '5mb'}));
app.use(cors({origin: "*"}));

app.use(morgan('dev'));

// app.set('superSecret', {
//     "typ": "JWT",
//     "alg": "HS256"
// });
//
// app.get('/login', (req, res) => {
//
//     res.send(200);
// });


function getToken(data) {
    console.log(data.email);
    return jwt.sign({email:data.email, _id:data._id,role:data.role}, 'superSecret', {
        expiresIn: 60 * 60 * 24
    });
}

app.post("/checkJwt", function (req, res) {
    let token = req.body.token;
    // console.log(token);
    if (token.length > 0) {
        jwt.verify(token, 'superSecret', function (err, decoded) {
            if (err) {
                console.log(err);
                return res.send({success: false});
            } else {
                console.log(decoded._doc);
                userDB.find(decoded._doc).then(data => {
                    if (data.length == 0) {
                        return res.send({success: false});
                    }
                    else {
                        console.log(data);
                        let token = getToken(data[0]);
                        console.log({success: true, user: data[0], token:token});
                        return res.send({success: true, user: data[0], token:token});
                    }
                });
            }
        });
    }else {
        return res.send({success: false});
    }
});

app.post('/sendInsructions', function (req, res) {
    userDB.findByEmail(req.body).then((data) => {
        if (data.length == 0) {
            res.send(false);
        } else {
            forgotPassDB.removeByEmail(req.body).then(() => {
                forgotPassDB.createForgotPass(req.body).then((data) => {
                        console.log(data);
                        let id = data._id;
                        let mailOptions = {
                            from: '"R-key" <5600t0@gmail.com>', // sender address
                            to: '' + req.body.email, // list of receivers
                            subject: 'Hello ✔', // Subject line
                            text: 'Hello world ?', // plain text body
                            html: '<div><div><b>Если вы хотите изметь ваш пароль, то пройдите по ссылке внизу</b></div>' +
                            '<div><a href="http://localhost:8090/restorePass?id=' +
                            id +
                            '">Ссылка</a></div></div> ' // html body
                        };

// send mail with defined transport object
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                res.send(false);
                                console.log(error);
                            }
                            console.log('Message %s sent: %s', info.messageId, info.response);
                            res.send(true);

                        });
                    }
                );
            });
        }
    })

});

app.post('/reg',(req,res)=>{
    console.log(req.body);
    userDB.findByEmail(req.body).then(data=>{
        if(data.length == 0)
        userDB.createUser(req.body).then(data=>{
            console.log(data);
            let token = getToken(data);
            res.send({user:data, token:token});
        });
        else res.send("Данный email уже зарегестрирован")
    }).catch((error) => {
        res.send("Ошибка обработки сервера!");
    });

});

app.post('/changeImage',(req,res)=>{
    console.log(req.body);
    userDB.findByID(req.body).then(data=>{
        if(data.length == 0){
            res.send("Неверный ID пользователя");}
        else {
            // console.log(data[0],req.body.newPass);
            userDB.restoreImage(data[0], req.body).then((data) => {
                // console.log({information:"Успешно изменён пароль",user:data,token:getToken(data)});
                res.send({information:"Успешно изменён аватар",user:data,token:getToken(data)});
            }).catch(err=>console.log(err))}
    }).catch((error) => {
        res.send("Ошибка обработки сервера!");
    });
});

app.post('/changePass',(req,res)=>{
    console.log(req.body);
    userDB.findByIDAndPass(req.body).then(data=>{
        if(data.length == 0){
            res.send("Неверный пароль");}
        else {
            console.log(data[0],req.body.newPass);
            userDB.restorePass(data[0], req.body.newPass).then((data) => {
                // console.log({information:"Успешно изменён пароль",user:data,token:getToken(data)});
                res.send({information:"Успешно изменён пароль",user:data,token:getToken(data)});
      }).catch(err=>console.log(err))}
    }).catch((error) => {
        res.send("Ошибка обработки сервера!");
    });
});

app.post('/changeEmail',(req,res)=>{
    console.log(req.body);
 userDB.findByEmail(req.body).then(data=>{
     if(data.length == 0){
         userDB.findByIDAndPass(req.body).then(data=>{
             if(data.length == 0){
                 res.send("Неверный пароль");}
             else {
                 userDB.restoreEmail(data[0], req.body.email).then(data => {
                     // console.log({information:"Успешно изменён email",user:data,token:getToken(data)});
                     res.send({information:"Успешно изменён email",user:data,token:getToken(data)});
                 })}
         }).catch((error) => {
             res.send("Ошибка обработки сервера!");
         });
     }
     else res.send("Ошибка - данный email уже есть в базе данных")
 });

});

app.post('/login', (req, res) => {
    userDB.findByEmailAndPass(req.body).then((data) => {
        if (data.length != 0) {
            // console.log(req.body);
            console.log(data[0].email);
            let token = getToken(data[0]);
            res.send({token: token, user: data[0]});
        }
        else {
            console.log(req.body);
            res.send("Ошибка ввода: Неверный email/пароль");
        }
    });

});

app.get('/dashboard', (req, res) => {
    res.send();
});

app.get('/restorePass', (req, res) => {
    console.log(req.query.id);
    function date_diff_indays(date1) {
        let dt1 = new Date(date1);
        let dt2 = new Date();
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) / (1000 * 60 * 60 * 24));
    };

    forgotPassDB.findById(req.query.id).then((data) => {
        console.log(data);
        if (data.length == 0 || date_diff_indays(data[0].date) > 2) {
            res.send(false);
        }
        res.send(true);
    }).catch((error) => {
        res.send(false);
    });
});

app.post('/restorePass', (req, res) => {
    let email;
    forgotPassDB.findById(req.query.id).then((data) => {
        email = data[0].email;
        console.log(data);
        console.log(email);
        userDB.findByEmail({email: email}).then(data => {
            console.log(data[0]);
            console.log(req.body);
            userDB.restorePass(data[0], req.body.pass).then(date => {
                forgotPassDB.removeByEmail({email: email}).then(date => {
                    res.send(true);
                })
            })
        })
    }).catch((error) => {
            res.send(false);
        }
    );

});


const server = app.listen(8080, () => {
    console.log(`Server is up and running on port 8080`);
});