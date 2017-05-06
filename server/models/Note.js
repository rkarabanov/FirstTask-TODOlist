import mongoose from "mongoose";

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const NoteSchema = new Schema({
    title:{type: String,required:true},
    task:{type: String,required:true},
    userID:{type: String,required:true},
    status:{type:Boolean,required:true},
    created_at:{type:Date,required:true},
    updated_at:{type:Date,required:true}
});

const Note = mongoose.model('Note', NoteSchema);
export default Note;