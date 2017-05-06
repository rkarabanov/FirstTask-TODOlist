import mongoose from "mongoose";

import '../models/Note';

const Note = mongoose.model('Note');


export function createNote(data) {
    const note = new Note({
        title:data.title,
        userID: data.userID,
        task: data.task||"",
        status:false,
        created_at:new Date(),
        updated_at:new Date()
    });
    return note.save();
}

export function changeStatus(data) {
    data.status=!data.status;
    data.updated_at=new Date();
    // console.log(data);
    const note = new Note(
        data
    );
    return note.save();
}

export function changeTask(data, newObj) {
    data.task=newObj.task;
    data.title=newObj.title;
    data.updated_at=new Date();
    // console.log(data);
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
