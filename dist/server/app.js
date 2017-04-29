'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _utilsUserDBUtils = require('./utils/UserDBUtils');

var userDB = _interopRequireWildcard(_utilsUserDBUtils);

var _utilsForgotPassDBUtils = require('./utils/ForgotPassDBUtils');

var forgotPassDB = _interopRequireWildcard(_utilsForgotPassDBUtils);

var _client_myValidationValidation = require('../client_my/validation/Validation');

var valid = _interopRequireWildcard(_client_myValidationValidation);

var session = require('express-session');

var morgan = require('morgan');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var app = (0, _express2['default'])();

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '5600t0@gmail.com',
        pass: '3455961536263Rk'
    }
});

userDB.setUpConnection();

app.use(_bodyParser2['default'].json());

app.use((0, _cors2['default'])({ origin: "*" }));

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
    return jwt.sign(data, 'superSecret', {
        expiresIn: 60 * 60 * 24
    });
}

app.post("/checkJwt", function (req, res) {
    var token = req.body.token;
    // console.log(token);
    if (token.length > 0) {
        jwt.verify(token, 'superSecret', function (err, decoded) {
            if (err) {
                console.log(err);
                return res.send({ success: false });
            } else {
                console.log(decoded._doc);
                userDB.find(decoded._doc).then(function (data) {
                    if (data.length == 0) {
                        return res.send({ success: false });
                    } else {
                        var _token = getToken(data[0]);
                        console.log({ success: true, user: data[0], token: _token });
                        return res.send({ success: true, user: data[0], token: _token });
                    }
                });
            }
        });
    } else {
        return res.send({ success: false });
    }
});

app.post('/sendInsructions', function (req, res) {
    userDB.findByEmail(req.body).then(function (data) {
        if (data.length == 0) {
            res.send(false);
        } else {
            forgotPassDB.removeByEmail(req.body).then(function () {
                forgotPassDB.createForgotPass(req.body).then(function (data) {
                    console.log(data);
                    var id = data._id;
                    var mailOptions = {
                        from: '"R-key" <5600t0@gmail.com>', // sender address
                        to: '' + req.body.email, // list of receivers
                        subject: 'Hello ✔', // Subject line
                        text: 'Hello world ?', // plain text body
                        html: '<div><div><b>Если вы хотите изметь ваш пароль, то пройдите по ссылке внизу</b></div>' + '<div><a href="http://localhost:8090/restorePass?id=' + id + '">Ссылка</a></div></div> ' // html body
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {

                            res.send(false);
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                        res.send(true);
                    });
                });
            });
        }
    });
});

app.post('/reg', function (req, res) {
    console.log(req.body);
    userDB.findByEmail(req.body).then(function (data) {
        if (data.length == 0) userDB.createUser(req.body).then(function (data) {
            console.log(data);
            var token = getToken(data);
            res.send({ user: data, token: token });
        });else res.send("Данный email уже зарегестрирован");
    })['catch'](function (error) {
        res.send("Ошибка обработки сервера!");
    });
});

app.post('/login', function (req, res) {
    userDB.findByEmailAndPass(req.body).then(function (data) {
        if (data.length != 0) {
            // console.log(req.body);
            console.log(data[0]);
            var token = getToken(data[0]);
            console.log({ token: token, user: data[0] });
            res.send({ token: token, user: data[0] });
        } else {
            console.log(req.body);
            res.send("Ошибка ввода: Неверный email/пароль");
        }
    });
});

app.get('/dashboard', function (req, res) {
    res.send();
});

app.get('/restorePass', function (req, res) {
    console.log(req.query.id);
    function date_diff_indays(date1) {
        var dt1 = new Date(date1);
        var dt2 = new Date();
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    };

    forgotPassDB.findById(req.query.id).then(function (data) {
        console.log(data);
        if (data.length == 0 || date_diff_indays(data[0].date) > 2) {
            res.send(false);
        }
        res.send(true);
    })['catch'](function (error) {
        res.send(false);
    });
});

app.post('/restorePass', function (req, res) {
    var email = undefined;
    forgotPassDB.findById(req.query.id).then(function (data) {
        email = data[0].email;
        console.log(data);
        console.log(email);
        userDB.findByEmail({ email: email }).then(function (data) {
            console.log(data[0]);
            console.log(req.body);
            userDB.restorePass(data[0], req.body.pass).then(function (date) {
                forgotPassDB.removeByEmail({ email: email }).then(function (date) {
                    res.send(true);
                });
            });
        });
    })['catch'](function (error) {
        res.send(false);
    });
});

var server = app.listen(8080, function () {
    console.log('Server is up and running on port 8080');
});
//# sourceMappingURL=app.js.map