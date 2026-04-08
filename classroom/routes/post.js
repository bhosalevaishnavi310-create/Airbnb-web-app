const express = require("express");
const router =express.Router();


router.get("/",(req,res)=>{
    res.send("get for user id");
});

router.get("/:id",(req,res)=>{
    res.send("GET for show user");
});

router.post("/",(req,res)=>{
    res.send("POST for user id");
});

router.delete("/:id",(req,res)=>{
    res.send("dele for users ")
});

module.exports=router;