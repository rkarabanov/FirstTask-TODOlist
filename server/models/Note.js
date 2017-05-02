import mongoose from "mongoose";

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const NoteSchema = new Schema({
    title: {type: String,required:true},
    tasks: {type: []},
    userID:{type: String,required:true}
});

const Note = mongoose.model('Note', NoteSchema);