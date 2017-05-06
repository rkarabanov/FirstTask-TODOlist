/* eslint-disable no-undef */
import express from 'express';

import cors from 'cors';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens
import * as userDB from '../utils/UserDBUtils';


import bodyParser from 'body-parser';

// import  userSeed from '../other/seeder';

const router = express.Router()
    .use(bodyParser.json({limit: '5mb'}))
    .use(cors({origin: "*"}));




function getToken(data) {
    // console.log(data.email);
    return jwt.sign({email: data.email, _id: data._id, role: data.role}, 'superSecret', {
        expiresIn: 60 * 60 * 24
    });
}

router.post("/checkJwt", function (req, res) {
    let token = req.body.token;
    // console.log(req.body.token);
    if (token.length > 0) {
        jwt.verify(token, 'superSecret', function (err, decoded) {
            if (err) {
                // console.log(err);
                return res.send({success: false});
            } else {
                // console.log("lol");
                // console.log(decoded);
                userDB.find({email: decoded.email, _id: decoded._id, role: decoded.role}).then(data => {
                    if (data.length === 0) {
                        return res.send({success: false});
                    }
                    else {
                        // console.log(data);
                        let token = getToken(data[0]);
                        // console.log({success: true, user: data[0], token: token});
                        return res.send({success: true, user: data[0], token: token});
                    }
                });
            }
        });
    } else {
        return res.send({success: false});
    }
});


router.post('/getAllUsers', (req, res) => {
    // console.log('/getAllUsers');
    // console.log(req.body);
    userDB.findByIDAndPass(req.body).then(data => {
        if (data.length !== 0 && data[0].role === "admin")
            userDB.getAll().then(data => {
                // console.log(data);
                res.send(data);
            });
        else res.send("Неверный данные пользователя")
    }).catch(() => {
        res.send("Ошибка обработки сервера!");
    });
});

router.post('/reg', (req, res) => {
    // console.log(req.body);
    userDB.findByEmail(req.body).then(data => {
        if (data.length === 0)
            userDB.createUser(req.body).then(data => {
                // console.log(data);
                let token = getToken(data);
                res.send({user: data, token: token});
            });
        else res.send("Данный email уже зарегестрирован")
    }).catch((error) => {
        res.send("Ошибка обработки сервера!");
    });

});

router.post('/changeImage', (req, res) => {
    // console.log(req.body);
    userDB.findByID(req.body).then(data => {
        if (data.length === 0) {
            res.send("Неверный ID пользователя");
        }
        else {
            // onCheck.log(data[0],req.body.newPass);
            userDB.restoreImage(data[0], req.body).then((data) => {
                // onCheck.log({information:"Успешно изменён пароль",user:data,token:getToken(data)});
                res.send({information: "Успешно изменён аватар", user: data, token: getToken(data)});
            }).catch(err => res.send(err))
        }
    }).catch((
    ) => {
        res.send("Ошибка обработки сервера!");
    });
});

router.post('/changePass', (req, res) => {
    // console.log(req.body);
    userDB.findByIDAndPass(req.body).then(data => {
        if (data.length === 0) {
            res.send("Неверный пароль");
        }
        else {
            // console.log(data[0], req.body.newPass);
            userDB.restorePass(data[0], req.body.newPass).then((data) => {
                // onCheck.log({information:"Успешно изменён пароль",user:data,token:getToken(data)});
                res.send({information: "Успешно изменён пароль", user: data, token: getToken(data)});
            }).catch(err => res.send(err))
        }
    }).catch(() => {
        res.send("Ошибка обработки сервера!");
    });
});

router.post('/changeEmail', (req, res) => {
    // console.log(req.body);
    userDB.findByEmail(req.body).then(data => {
        if (data.length === 0) {
            userDB.findByIDAndPass(req.body).then(data => {
                if (data.length === 0) {
                    res.send("Неверный пароль");
                }
                else {
                    userDB.restoreEmail(data[0], req.body.email).then(data => {
                        // onCheck.log({information:"Успешно изменён email",user:data,token:getToken(data)});
                        res.send({information: "Успешно изменён email", user: data, token: getToken(data)});
                    })
                }
            }).catch(() => {
                res.send("Ошибка обработки сервера!");
            });
        }
        else res.send("Ошибка - данный email уже есть в базе данных")
    });

});

router.post('/login', (req, res) => {
    userDB.findByEmailAndPass(req.body).then((data) => {
        // console.log((req.body.OAuth==data[0].OAuth));
        // console.log(data[0]);
        if (data.length !== 0 && ((req.body.OAuth === undefined && data[0].OAuth === undefined) || req.body.OAuth === data[0].OAuth)) {
            // onCheck.log(req.body);
            // console.log(data[0].email);
            let token = getToken(data[0]);
            jwt.verify(token, 'superSecret', function (err, decoded) {
                if (err) {
                    // console.log(err);
                } else {
                    // console.log(decoded);
                }
            });
            // console.log("all ok");
            res.send({token: token, user: data[0]});
        }
        else {
            // console.log(req.body);
            res.send("Ошибка ввода: Неверный email/пароль");
        }
    });

});

// router.get('/seeder',(req,res)=>{
//     for (let i=0; i<15; i++){
//
//         userDB.createUser(userSeed())}
// res.send("All ok");
// });

module.exports = router;