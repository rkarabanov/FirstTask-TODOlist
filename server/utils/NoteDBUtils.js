import mongoose from "mongoose";

import '../models/Note';

const Note = mongoose.model('Note');

export function setUpConnection(){
    mongoose.connect(`mongodb://test:test@ds157390.mlab.com:57390/newdb`);
}

export function createNote(data) {
    const note = new Note({
        userID: data.userID,
        task: data.task||"",
        status:false
    });
    return note.save();
}

export function changeStatus(data) {
    data.status=!data.status;
    console.log(data);
    const note = new Note(
        data
    );
    return note.save();
}

export function changeTask(data, newObj) {
    data.task=newObj.task;
    console.log(data);
    const note = new Note(
        data
    );
    return note.save();
}

export function deleteNote(data) {
    return Note.remove(data);
}

export function findByID(data) {
    return Note.find({
        _id:data._id
    });
}

export function findByUserID(data) {
    return Note.find({
        userID:data.userID
    });
}
