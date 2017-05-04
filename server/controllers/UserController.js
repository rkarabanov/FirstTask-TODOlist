import express from 'express';
import cors from 'cors';
import * as userDB from '../utils/UserDBUtils';
const router = express.Router();

const app = express();
app.use(cors({origin: "*"}));
app.use(bodyParser.json({limit: '5mb'}));
userDB.setUpConnection();