"use strict";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _connectionDbConnection = require("./connection/dbConnection");

var connect = _interopRequireWildcard(_connectionDbConnection);

var morgan = require('morgan');

var app = (0, _express2["default"])();

connect.setUpConnection();
app.use(morgan('dev'));
app.use(require('./controllers/UserController'));
app.use(require('./controllers/ForgotPassController'));
app.use(require('./controllers/NoteController'));

var server = app.listen(8080, function () {
    console.log("Server is up and running on port 8080");
});
//# sourceMappingURL=app.js.map