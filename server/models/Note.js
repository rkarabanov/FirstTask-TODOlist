import mongoose from "mongoose";

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const NoteSchema = new Schema({
    task:{type: String},
    userID:{type: String,required:true},
    status:{type:Boolean}
});

const Note = mongoose.model('Note', NoteSchema);