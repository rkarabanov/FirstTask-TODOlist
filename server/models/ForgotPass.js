import mongoose from "mongoose";

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const ForgotPassSchema = new Schema({
    email: {type: String, required: true},
    date: {type: Date, required: true}
});

const ForgotPass = mongoose.model('ForgotPass', ForgotPassSchema);
export default ForgotPass;