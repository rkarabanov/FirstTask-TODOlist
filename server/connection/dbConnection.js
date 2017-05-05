import mongoose from "mongoose";

export function setUpConnection() {
    mongoose.connect(`mongodb://test:test@ds157390.mlab.com:57390/newdb`);
}