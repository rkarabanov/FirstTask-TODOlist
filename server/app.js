import express from "express";
const morgan = require('morgan');

const app = express();


import * as connect from "./connection/dbConnection"
connect.setUpConnection();
app.use(morgan('dev'));
app.use(require('./controllers/UserController'));
app.use(require('./controllers/ForgotPassController'));
app.use(require('./controllers/NoteController'));


const server = app.listen(8080, () => {
    console.log(`Server is up and running on port 8080`);
});