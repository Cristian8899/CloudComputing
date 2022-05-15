const express = require('express');
const mysql  = require ('mysql');
const res = require('express/lib/response');
const router = express.Router();
const connection = require('../database');



router.get("/",(req,res) =>{
    connection.query("SELECT * FROM recenzii",(err,results)=>{
     if (err){console.log(err); return res.send(err);}
    
     return res.json({messages: results,})
    
    })
    });


router.get("/:id",(req,res) =>{
    const {id} = req.params;
        connection.query(`SELECT * FROM recenzii where entryID = ${mysql.escape(id)} `,(err,results)=>{
         if (err){console.log(err); return res.send(err);}
        
if (results.length) { return res.status(400).json({error: "Message not found,"})}

         return res.json({messages: results,})
        
        })
        });



router.post("/",(req,res) =>{
       console.log(req.body);
       const {
           senderName,
           senderMail,
           continutRecenzie,
       } = req.body;


if (!senderName || !senderMail || !continutRecenzie){

    return res.status(400).json({
        error: "All fields are required",
    })
}

connection.query(`insert into recenzii(senderName,senderMail,continutRecenzie) values (${mysql.escape(senderName)},${mysql.escape(senderMail)},${mysql.escape(continutRecenzie)})`
,(err,results) =>{

    if (err){
            console.log(err);
            return res.send(err);
    }
     
    return res.json({results,})
})

     

    });



//delete recenzie
router.delete("/:id",(req,res) =>{
    const {id} = req.params;
     connection.query(`DELETE FROM recenzii where entryID = ${mysql.escape(id)}`,(err,results) =>{
if (err) {
    console.log(err);
    return res.send(err);
}
return res.json({results,})

     })


        });
    
//update       
router.put("/:id",(req,res) =>{
    const {id} = req.params;
    const {
        senderName,
        senderMail,
        continutRecenzie,
    } = req.body;

    if (!senderName || !senderMail || !continutRecenzie){

        return res.status(400).json({
            error: "All fields are required",
        })
    }

    connection.query(`UPDATE recenzii SET senderName = ${mysql.escape(senderName)}, senderMail = ${mysql.escape(senderMail)},  continutRecenzie= ${mysql.escape(continutRecenzie)} WHERE entryID = ${mysql.escape(id)}` ,(err, results) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        
        return res.json({
            results,
        })}
    );



        });



module.exports = router;