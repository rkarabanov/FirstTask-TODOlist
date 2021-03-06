import mongoose from "mongoose";

import '../models/User';

const User = mongoose.model('User');



export function createUser(data) {
    let buffer={};
    if (data.OAuth!==undefined){
        buffer={
            email: data.email,
            pass: data.pass,
            role:"user",
            data_uri:data.imageUrl,
            filename:data.filename,
            OAuth:data.OAuth,
            filetype:data.filetype
        }
    } else {
        buffer= {
            email: data.email,
            pass: data.pass,
            role:"user"
        }
    }
    const user = new User(buffer);
    return user.save();
}

export function restorePass(data, newPass) {
    data.pass=newPass;
    // console.log(data);
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
    // console.log(data);
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