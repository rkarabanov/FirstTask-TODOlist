'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.setUpConnection = setUpConnection;
exports.createUser = createUser;
exports.find = find;
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
        role: data.role
    });
    return user.save();
}

function find(data) {
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