
const express =require('express')
const router = express.Router()
const User = require("../modules/customer_Registration")
const {check,validationResult} = require("express-validator")
const cryptjs = require('bcryptjs');
const path = require('path')
const jwt = require('jsonwebtoken');
const upload = require('../middleware/upload');
const { verifyUser } = require('../middleware/auth');


router.post('/insert',function(req,res){
    const error = validationResult(req)
    if(error.isEmpty())
    {
    
        //password encription
        const fname = req.body.fname
        const lname = req.body.lname
        const phone = req.body.phone
        const username = req.body.username
        const password = req.body.password
        const userType = req.body.type
       

        cryptjs.hash(password,10,function(err,hash){
    
            console.log(hash)
            
            const datas = new User({FirstName:fname,Lastname:lname
                ,PhoneNumber:phone,Username:username,Password:hash,UserType:userType})
                datas.save().then(function(result){
                  console.log(datas._id)
                    res.status(201).json({status:true,data:datas})
         
              })
            .catch(function(errors){

                res.status(5000).json({message:errors})
            })
        
        })
    

}
else{
    res.status(400).json(error.array())
}


})

//lets create a login system
router.post('/login', function(req,res){
  console.log("Asdasldknaskd")
    const email=req.body.username;
    const password=req.body.password;
User.findOne({Username  : email})
    .then(function(accData){
        if(accData===null){
            return res.status(200).json({status:false})
        }
        cryptjs.compare(password,accData.Password,function(reeoe,result){
            if(result===false)
            {
                return res.status(200).json({status:false})
            }
           
            //now generating token
            //new modules jsonwebtoken
          const token =  jwt.sign({id:accData._id},'secretkey');
          res.status(200).json({token:token,status:true,data:accData,success:true})
        
console.log(accData)
            })
          
        
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
})

router.get('/show',function(req,res){

  const data = User.find().then(function(result){
  
      res.status(200).json({success:true,data:result})
      console.log(result)
  }).catch(function(error){
  res.status(500).json({error:error})
  
  })
  
  })
router.put('/photo/:id',upload.single('file'),function(req, res){
const id= req.params.id
    const user =User.findById(req.params.id).then(function(s){
      console.log(req.file)
    
    });
    
    if (!user) {
      return res.status(400).json({message:"No user Found"})
  
    }
    const file = req.file;
console.log(req.file.path)
 
     User.findByIdAndUpdate({_id:id},{
       Profile:file.filename
     }).then(function (params) {
       console.log("asdasd")
       
     })
      res.status(200).json({
        success: true,
        data: user
      });
  
    
})




router.delete('/delete/:id',function(req,res){

  const id = req.params.id
  User.deleteOne({_id:id}).then(function(result){
      res.status(200).json({success:true,message:"Deleted"})
  }
      
  ).catch(function(err){
      res.status(500).json({error:err})
  })

})


router.put('/update',verifyUser,upload.single('file'),function(req,res){
  const file = req.file

  const fname = req.body.fname
  const lname = req.body.lname
  const address = req.body.address
  const gender = req.body.gender
  const phone = req.body.phone
  const username = req.body.username
  const password = req.body.password
  const userType = req.body.type
  const profile = file.filename
 

  cryptjs.hash(password,10,function(err,hash){

     
      
      User.updateOne({_id:req.user._id},{FirstName:fname,Lastname:lname,Address:address,Gender:gender
          ,PhoneNumber:phone,Username:username,Password:hash,Profile:profile,UserType:userType}).then(function(result){
            
              res.status(201).json({success:true,message:"User Updated"})
              console.log("true")
   
        })
      .catch(function(errors){

          res.status(5000).json({message:errors})
      })
  
  })
  
  
  
  
  
  
  })


  router.get('/userDetail',verifyUser,(req,res)=>{

console.log(req.user)
    User.findOne({_id:req.user._id}).then((data)=>{

      res.status(200).json({success:true,data:data})
    })
  })

 
  
    
    
    



module.exports = router



