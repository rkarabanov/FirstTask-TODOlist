'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createUser = createUser;
exports.restorePass = restorePass;
exports.restoreImage = restoreImage;
exports.restoreEmail = restoreEmail;
exports.findByIDAndPass = findByIDAndPass;
exports.find = find;
exports.findByEmailAndPass = findByEmailAndPass;
exports.findByID = findByID;
exports.getAll = getAll;
exports.findByEmail = findByEmail;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

require('../models/User');

var User = _mongoose2['default'].model('User');

function createUser(data) {
    var buffer = {};
    if (data.OAuth !== undefined) {
        buffer = {
            email: data.email,
            pass: data.pass,
            role: "user",
            data_uri: data.imageUrl,
            filename: data.filename,
            OAuth: data.OAuth,
            filetype: data.filetype
        };
    } else {
        buffer = {
            email: data.email,
            pass: data.pass,
            role: "user"
        };
    }
    var user = new User(buffer);
    return user.save();
}

function restorePass(data, newPass) {
    data.pass = newPass;
    // console.log(data);
    var user = new User(data);
    return user.save();
}

function restoreImage(data, newData) {
    data.data_uri = newData.data_uri;
    data.filename = newData.filename;
    data.filetype = newData.filetype;
    // onCheck.log(data);
    var user = new User(data);
    return user.save();
}

function restoreEmail(data, newEmail) {
    data.email = newEmail;
    // console.log(data);
    var user = new User(data);
    return user.save();
}

function findByIDAndPass(data) {
    return User.find({
        pass: data.pass,
        _id: data._id
    });
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

function findByID(data) {
    return User.find({
        _id: data._id
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