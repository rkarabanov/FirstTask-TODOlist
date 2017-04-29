'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.setUpConnection = setUpConnection;
exports.createUser = createUser;
exports.restorePass = restorePass;
exports.find = find;
exports.findByEmailAndPass = findByEmailAndPass;
exports.getAll = getAll;
exports.findByEmail = findByEmail;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

require('../models/User');

var User = _mongoose2['default'].model('User');

function setUpConnection() {
    _mongoose2['default'].connect('mongodb://test:test@ds157390.mlab.com:57390/newdb');
}

function createUser(data) {
    var user = new User({
        email: data.email,
        pass: data.pass,
        role: "user"
    });
    return user.save();
}

function restorePass(data, newPass) {
    data.pass = newPass;
    console.log(data);
    var user = new User(data);
    return user.save();
}

function find(data) {
    return User.find(data);
}

function findByEmailAndPass(data) {
    return User.find({
        email: data.email,
        pass: data.pass
    });
}

function getAll() {
    return User.find({});
}

function findByEmail(data) {
    return User.find({
        email: data.email
    });
}
//# sourceMappingURL=UserDBUtils.js.map