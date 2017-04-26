import mongoose from "mongoose";

import '../models/ForgotPass';

const ForgotPass = mongoose.model('ForgotPass');


export function createForgotPass(data) {
    const forgotPass = new ForgotPass({
        email: data.email,
        date: new Date()
    });
    return forgotPass.save();
}

export function removeByEmail(data) {
   return ForgotPass.remove({email:data.email});
}

export function findById(id) {
    return ForgotPass.find({
        _id: id,
    });
}

export function getAll() {
    return ForgotPass.find({});
}

export function findByEmail(data) {
    return ForgotPass.find({
        email: data.email
    });
}