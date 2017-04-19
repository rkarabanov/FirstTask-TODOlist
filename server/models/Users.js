import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true  },
    pass: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);