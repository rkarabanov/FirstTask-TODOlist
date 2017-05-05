import express from "express";
import morgan from 'morgan';
import * as connect from "./connection/dbConnection"
const app = express();



connect.setUpConnection();
app.use(morgan('dev'));
app.use(require('./controllers/UserController'));
app.use(require('./controllers/ForgotPassController'));
app.use(require('./controllers/NoteController'));


const server = app.listen(8080, () => {
    console.log(`Server is up and running on port 8080`);
});