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

export function restoreImage(data, newData) {
    data.data_uri=newData.data_uri;
    data.filename=newData.filename;
    data.filetype=newData.filetype;
    // onCheck.log(data);
    const user = new User(
        data
    );
    return user.save();
}

export function restoreEmail(data, newEmail) {
    data.email=newEmail;
    console.log(data);
    const user = new User(
        data
    );
    return user.save();
}

export function findByIDAndPass(data) {
    return User.find({
        pass: data.pass,
        _id:data._id
    });
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

export function findByID(data) {
    return User.find({
        _id:data._id
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