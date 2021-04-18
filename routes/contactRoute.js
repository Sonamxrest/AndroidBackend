const express = require('express')
const router = express.Router()
const {verifyUser}= require('../middleware/auth')
const contact =require('../modules/contact')



router.post('/sendMessage',verifyUser,function(req,res){
const user = req.user
const message = req.body.message
const userId= user._id

const c = new contact({UserId:userId,Comment:mesage})
c.save().then((data)=>{
    res.status(200).json({success:true,data:data})
})

})



router.get('/allMessages',(req,res)=>{

    contact.find().then((data)=>{

        res.status(200).json({success:true,data:data})
    })
})


module.exports =router