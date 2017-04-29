import mongoose from "mongoose";

import '../models/User';

const User = mongoose.model('User');

export function setUpConnection(){
    mongoose.connect(`mongodb://test:test@ds157390.mlab.com:57390/newdb`);

}

export function createUser(data) {
    const user = new User({
        email: data.email,
        pass: data.pass,
        role:"user"
    });
    return user.save();
}

export function restorePass(data, newPass) {
    data.pass=newPass;
    console.log(data);
    const user = new User(
        data
    );
    return user.save();
}


export function find(data) {
    return User.find(data);
}

export function findByEmailAndPass(data) {
    return User.find({
        email: data.email,
        pass: data.pass
    });
}

export function getAll() {
    return User.find({});
}


export function findByEmail(data) {
    return User.find({
        email: data.email
    });
}