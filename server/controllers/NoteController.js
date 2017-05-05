const express = require('express'),
    router = express.Router();


import * as userDB from '../utils/UserDBUtils';
import * as noteDB from '../utils/NoteDBUtils';

import xlsx from 'node-xlsx';
import bodyParser from 'body-parser';
router.use(bodyParser.json({limit: '5mb'}));



router.post('/getTasks', (req, res) => {
    console.log('/getTasks');
    console.log(req.body);
    userDB.findByIDAndPass(req.body).then(data => {
        if (data.length != 0)
            noteDB.findByUserID({userID:data[0]._id}).then(data => {
                console.log(data);
                res.send( data);
            });
        else res.send("Неверный данные пользователя")
    }).catch((error) => {
        res.send("Ошибка обработки сервера!");
    });
});


router.post('/addTask', (req, res) => {
    console.log(req.body);
    let userinfo={pass:req.body.pass, _id:req.body.userID};
    userDB.findByIDAndPass(userinfo).then(data => {
        if (data.length != 0)
            noteDB.createNote(req.body).then(data => {
                noteDB.findByUserID(req.body).then(data => {
                    console.log(data);
                    res.send( data);}
                );
            });
        else res.send("Неверный данные пользователя")
    }).catch((error) => {
        res.send("Ошибка обработки сервера!");
    });
});

router.post('/getXlsx', function(req, res){
    console.log(req.body);
    userDB.findByIDAndPass(req.body).then(data => {
        if (data.length != 0)
            noteDB.findByUserID({userID:data[0]._id}).then(data => {
                // console.log(data);
                let headers= ["Tasks", "Is finish"];
                let arr=[];
                arr.push(headers);
                data.map(e=>{
                    let a=[];
                    a.push(e.task);
                    a.push(e.status?"Yes":"No");
                    arr.push(a);
                });
                // res.send(data);
                let buffer = xlsx.build([{name: "mySheetName", data: arr}]); // Returns a buffer
                res.end(buffer.toString('base64'));
            });
        else res.send("Неверный данные пользователя")
    }).catch((error) => {
        res.send("Ошибка обработки сервера!");
    });
});

router.post('/changeTaskStatus', (req, res) => {
    let userinfo={pass:req.body.pass, _id:req.body.userID};
    userDB.findByIDAndPass(userinfo).then(data => {
        if (data.length != 0)
            noteDB.findByID(req.body).then(data => {
                // console.log(data[0]);
                if(data[0].userID==req.body.userID){
                    noteDB.changeStatus(data[0]).then(data => {
                        noteDB.findByUserID(req.body).then(data => {
                            // console.log(data);
                            res.send( data);
                        });})}
                else res.send( "Попытка неверно передать информацию");
            });
        else res.send("Неверный данные пользователя")
    }).catch((error) => {
        res.send("Ошибка обработки сервера!");
    });
});

router.post('/removeTask', (req, res) => {
    let userinfo={pass:req.body.pass, _id:req.body.userID};
    userDB.findByIDAndPass(userinfo).then(data => {
        if (data.length != 0)
            noteDB.findByID(req.body).then(data => {
                console.log(data[0]);
                if(data[0].userID==req.body.userID){
                    noteDB.deleteNote(data[0]).then(data => {
                        noteDB.findByUserID(req.body).then(data => {
                            console.log(data);
                            res.send( data);
                        });})}
                else res.send( "Попытка неверно передать информацию");
            });
        else res.send("Неверный данные пользователя")
    }).catch((error) => {
        res.send("Ошибка обработки сервера!");
    });
});


module.exports = router;