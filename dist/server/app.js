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

var _validationValidation = require('./validation/Validation');

var valid = _interopRequireWildcard(_validationValidation);

var app = (0, _express2['default'])();

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

app.post('/login', function (req, res) {
    userDB.find(req.body).then(function (data) {
        console.log(data);
        if (data.length != 0) {
            localStorage.setItem('userInSystem', data[0]);
            res.send(data);
        } else {
            res.send(['asd']);
        }
    });
});

app.get('/dashboard', function (req, res) {
    res.send();
});

var server = app.listen(8080, function () {
    console.log('Server is up and running on port 8080');
});
//# sourceMappingURL=app.js.map