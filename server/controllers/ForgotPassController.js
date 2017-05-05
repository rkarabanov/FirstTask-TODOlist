import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

import * as userDB from '../utils/UserDBUtils';
import * as forgotPassDB from '../utils/ForgotPassDBUtils';

const router = express.Router().use(bodyParser.json({limit: '5mb'}));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '5600t0@gmail.com',
        pass: '3455961536263Rk'
    }
});

// userDB.setUpConnection();

router.post('/sendInsructions', function (req, res) {
    userDB.findByEmail(req.body).then((data) => {
        if (data.length == 0||data[0].Auth!=undefined) {
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
                            email: 'Hello world ?', // plain email body
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
                            // console.log('Message %s sent: %s', info.messageId, info.response);
                            res.send(true);

                        });
                    }
                );
            });
        }
    })

});


router.get('/restorePass', (req, res) => {
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

router.post('/restorePass', (req, res) => {
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


module.exports = router;