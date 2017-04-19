"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var Schema = _mongoose2["default"].Schema;

var UserSchema = new Schema({
    email: { type: String, required: true },
    pass: { type: String, required: true },
    role: { type: String, required: true }
});

var User = _mongoose2["default"].model('User', UserSchema);
//# sourceMappingURL=Users.js.map