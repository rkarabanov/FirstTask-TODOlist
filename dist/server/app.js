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

var localStorage = null;

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

app.use(_bodyParser2['default'].json());

app.use((0, _cors2['default'])({ origin: "*" }));

app.get('/login', function (req, res) {
    res.send();
});

app.post('/sendInsructions', function (req, res) {
    userDB.findByEmail(req.body).then(function (data) {
        if (data.length == 0) {
            res.send("error");
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
                        html: '<div><b>Если вы хотите изметь ваш парль, то пройдите по ссылке внизу</b>' + '<a href="http://localhost:8090/restorePass?id=' + id + '">Ссылка</a></div> ' // html body
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {

                            res.send("error");
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                        res.send('success');
                    });
                });
            });
        }
    });
});

app.post('/login', function (req, res) {
    if (!valid.isValidateEmail(req.body.email)) {
        res.send("Ошибка ввода: Некорректный email");
    }
    userDB.find(req.body).then(function (data) {
        if (data.length != 0) {
            localStorage.setItem('userInSystem', data[0]);
            console.log(req.body);
            res.send(data[0]);
        } else {
            console.log(req.body);
            res.send("Ошибка ввода: Неверной email/пароль");
        }
    });
});

app.post('/sendInsructions', function (req, res) {
    console.log(req.body);
    res.send("Ошибка ввода: Неверной email/пароль");
});

app.get('/dashboard', function (req, res) {
    res.send();
});

var server = app.listen(8080, function () {
    console.log('Server is up and running on port 8080');
});
//# sourceMappingURL=app.js.map