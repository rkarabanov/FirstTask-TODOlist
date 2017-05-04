'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _utilsUserDBUtils = require('./utils/UserDBUtils');

var userDB = _interopRequireWildcard(_utilsUserDBUtils);

var _utilsForgotPassDBUtils = require('./utils/ForgotPassDBUtils');

var forgotPassDB = _interopRequireWildcard(_utilsForgotPassDBUtils);

var _utilsNoteDBUtils = require('./utils/NoteDBUtils');

var noteDB = _interopRequireWildcard(_utilsNoteDBUtils);

var _nodeXlsx = require('node-xlsx');

var _nodeXlsx2 = _interopRequireDefault(_nodeXlsx);

var session = require('express-session');
var nodeExcel = require('excel-export');

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

app.use(_bodyParser2['default'].json({ limit: '5mb' }));
app.use(cors({ origin: "*" }));

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
    return jwt.sign({ email: data.email, _id: data._id, role: data.role }, 'superSecret', {
        expiresIn: 60 * 60 * 24
    });
}

app.post("/checkJwt", function (req, res) {
    var token = req.body.token;
    console.log(req.body.token);
    if (token.length > 0) {
        jwt.verify(token, 'superSecret', function (err, decoded) {
            if (err) {
                console.log(err);
                return res.send({ success: false });
            } else {
                console.log("lol");
                console.log(decoded);
                userDB.find({ email: decoded.email, _id: decoded._id, role: decoded.role }).then(function (data) {
                    if (data.length == 0) {
                        return res.send({ success: false });
                    } else {
                        // console.log(data);
                        var _token = getToken(data[0]);
                        // console.log({success: true, user: data[0], token: token});
                        return res.send({ success: true, user: data[0], token: _token });
                    }
                });
            }
        });
    } else {
        return res.send({ success: false });
    }
});

app.post('/addTask', function (req, res) {
    console.log(req.body);
    var userinfo = { pass: req.body.pass, _id: req.body.userID };
    userDB.findByIDAndPass(userinfo).then(function (data) {
        if (data.length != 0) noteDB.createNote(req.body).then(function (data) {
            noteDB.findByUserID(req.body).then(function (data) {
                console.log(data);
                res.send(data);
            });
        });else res.send("Неверный данные пользователя");
    })['catch'](function (error) {
        res.send("Ошибка обработки сервера!");
    });
});

app.post('/getTasks', function (req, res) {
    console.log('/getTasks');
    console.log(req.body);
    userDB.findByIDAndPass(req.body).then(function (data) {
        if (data.length != 0) noteDB.findByUserID({ userID: data[0]._id }).then(function (data) {
            console.log(data);
            res.send(data);
        });else res.send("Неверный данные пользователя");
    })['catch'](function (error) {
        res.send("Ошибка обработки сервера!");
    });
});

app.post('/getTasks', function (req, res) {
    // console.log('/getTasks');
    console.log(req.body);
    userDB.findByIDAndPass(req.body).then(function (data) {
        if (data.length != 0) noteDB.findByUserID({ userID: data[0]._id }).then(function (data) {
            console.log(data);
            res.send(data);
        });else res.send("Неверный данные пользователя");
    })['catch'](function (error) {
        res.send("Ошибка обработки сервера!");
    });
});

// app.get('/xml', function(req, res){
//     // let conf ={};
//     // // conf.stylesXmlFile = "styles.xml";
//     // // conf.name = "mysheet";
//     // conf.cols = [{
//     //     caption:'string',
//     //     type:'string',
//     //     beforeCellWrite:function(row, cellData){
//     //         return cellData.toUpperCase();
//     //     },
//     //     width:28.7109375
//     // },{
//     //     caption:'date',
//     //     type:'date',
//     //     beforeCellWrite:function(){
//     //         let originDate = new Date(Date.UTC(1899,11,30));
//     //         return function(row, cellData, eOpt){
//     //             if (eOpt.rowNum%2){
//     //                 eOpt.styleIndex = 1;
//     //             }
//     //             else{
//     //                 eOpt.styleIndex = 2;
//     //             }
//     //             if (cellData === null){
//     //                 eOpt.cellType = 'string';
//     //                 return 'N/A';
//     //             } else
//     //                 return (cellData - originDate) / (24 * 60 * 60 * 1000);
//     //         }
//     //     }()
//     // },{
//     //     caption:'bool',
//     //     type:'bool'
//     // },{
//     //     caption:'number',
//     //     type:'number'
//     // }];
//     // conf.rows = [
//     //     ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
//     //     ["e", new Date(2012, 4, 1), false, 2.7182],
//     //     ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
//     //     ["null date", null, true, 1.414]
//     // ];
//     // let result = nodeExcel.execute(conf);
//     // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     // res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
//     // res.end(result, 'binary');
//
//
//     const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
//     let buffer = xlsx.build([{name: "mySheetName", data: data}]); // Returns a buffer
//     res.end(buffer.toString('base64'));
// });

app.post('/getXlsx', function (req, res) {
    console.log(req.body);
    userDB.findByIDAndPass(req.body).then(function (data) {
        if (data.length != 0) noteDB.findByUserID({ userID: data[0]._id }).then(function (data) {
            // console.log(data);
            var headers = ["Tasks", "Is finish"];
            var arr = [];
            arr.push(headers);
            data.map(function (e) {
                var a = [];
                a.push(e.task);
                a.push(e.status ? "Yes" : "No");
                arr.push(a);
            });
            // res.send(data);
            var buffer = _nodeXlsx2['default'].build([{ name: "mySheetName", data: arr }]); // Returns a buffer
            res.end(buffer.toString('base64'));
        });else res.send("Неверный данные пользователя");
    })['catch'](function (error) {
        res.send("Ошибка обработки сервера!");
    });
});

app.post('/getAllUsers', function (req, res) {
    console.log('/getAllUsers');
    console.log(req.body);
    userDB.findByIDAndPass(req.body).then(function (data) {
        if (data.length != 0 && data[0].role == "admin") userDB.getAll().then(function (data) {
            console.log(data);
            res.send(data);
        });else res.send("Неверный данные пользователя");
    })['catch'](function (error) {
        res.send("Ошибка обработки сервера!");
    });
});

app.post('/changeTaskStatus', function (req, res) {
    var userinfo = { pass: req.body.pass, _id: req.body.userID };
    userDB.findByIDAndPass(userinfo).then(function (data) {
        if (data.length != 0) noteDB.findByID(req.body).then(function (data) {
            // console.log(data[0]);
            if (data[0].userID == req.body.userID) {
                noteDB.changeStatus(data[0]).then(function (data) {
                    noteDB.findByUserID(req.body).then(function (data) {
                        // console.log(data);
                        res.send(data);
                    });
                });
            } else res.send("Попытка неверно передать информацию");
        });else res.send("Неверный данные пользователя");
    })['catch'](function (error) {
        res.send("Ошибка обработки сервера!");
    });
});

app.post('/removeTask', function (req, res) {
    var userinfo = { pass: req.body.pass, _id: req.body.userID };
    userDB.findByIDAndPass(userinfo).then(function (data) {
        if (data.length != 0) noteDB.findByID(req.body).then(function (data) {
            console.log(data[0]);
            if (data[0].userID == req.body.userID) {
                noteDB.deleteNote(data[0]).then(function (data) {
                    noteDB.findByUserID(req.body).then(function (data) {
                        console.log(data);
                        res.send(data);
                    });
                });
            } else res.send("Попытка неверно передать информацию");
        });else res.send("Неверный данные пользователя");
    })['catch'](function (error) {
        res.send("Ошибка обработки сервера!");
    });
});

app.post('/sendInsructions', function (req, res) {
    userDB.findByEmail(req.body).then(function (data) {
        if (data.length == 0 || data[0].Auth != undefined) {
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
                        email: 'Hello world ?', // plain email body
                        html: '<div><div><b>Если вы хотите изметь ваш пароль, то пройдите по ссылке внизу</b></div>' + '<div><a href="http://localhost:8090/restorePass?id=' + id + '">Ссылка</a></div></div> ' // html body
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            res.send(false);
                            console.log(error);
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

app.post('/changeImage', function (req, res) {
    console.log(req.body);
    userDB.findByID(req.body).then(function (data) {
        if (data.length == 0) {
            res.send("Неверный ID пользователя");
        } else {
            // onCheck.log(data[0],req.body.newPass);
            userDB.restoreImage(data[0], req.body).then(function (data) {
                // onCheck.log({information:"Успешно изменён пароль",user:data,token:getToken(data)});
                res.send({ information: "Успешно изменён аватар", user: data, token: getToken(data) });
            })['catch'](function (err) {
                return console.log(err);
            });
        }
    })['catch'](function (error) {
        res.send("Ошибка обработки сервера!");
    });
});

app.post('/changePass', function (req, res) {
    console.log(req.body);
    userDB.findByIDAndPass(req.body).then(function (data) {
        if (data.length == 0) {
            res.send("Неверный пароль");
        } else {
            console.log(data[0], req.body.newPass);
            userDB.restorePass(data[0], req.body.newPass).then(function (data) {
                // onCheck.log({information:"Успешно изменён пароль",user:data,token:getToken(data)});
                res.send({ information: "Успешно изменён пароль", user: data, token: getToken(data) });
            })['catch'](function (err) {
                return console.log(err);
            });
        }
    })['catch'](function (error) {
        res.send("Ошибка обработки сервера!");
    });
});

app.post('/changeEmail', function (req, res) {
    console.log(req.body);
    userDB.findByEmail(req.body).then(function (data) {
        if (data.length == 0) {
            userDB.findByIDAndPass(req.body).then(function (data) {
                if (data.length == 0) {
                    res.send("Неверный пароль");
                } else {
                    userDB.restoreEmail(data[0], req.body.email).then(function (data) {
                        // onCheck.log({information:"Успешно изменён email",user:data,token:getToken(data)});
                        res.send({ information: "Успешно изменён email", user: data, token: getToken(data) });
                    });
                }
            })['catch'](function (error) {
                res.send("Ошибка обработки сервера!");
            });
        } else res.send("Ошибка - данный email уже есть в базе данных");
    });
});

app.post('/login', function (req, res) {
    userDB.findByEmailAndPass(req.body).then(function (data) {
        // console.log((req.body.OAuth==data[0].OAuth));
        // console.log(data[0]);
        if (data.length != 0 && (req.body.OAuth == undefined && data[0].OAuth == undefined || req.body.OAuth == data[0].OAuth)) {
            // onCheck.log(req.body);
            console.log(data[0].email);
            var token = getToken(data[0]);
            jwt.verify(token, 'superSecret', function (err, decoded) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(decoded);
                }
            });
            console.log("all ok");
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