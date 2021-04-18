const jwt = require('jsonwebtoken')
const User = require('../modules/customer_Registration')

//guard for
module.exports.verifyUser=function(req,res,next){
  
try{
   
const token = req.headers.authorization.split(" ")[1];

const decodedData = jwt.verify(token,'secretkey');
User.findOne({_id:decodedData.id}).then(function(userData){
//res.send(userData)
req.user = userData

next()

}).catch(function(err){
    res.status(500).json({message:"Auth Failed"})

})
}
catch(err){

    res.status(401).json({message:"Auth failed1"})
    console.log(err)
}







}


//antother user

module.exports.verifyAdmin = function(req,res,next){

if(!req.user)
{

    return res.status(401).json({mesasge:"UnAuthorized User"})
}
else if(req.user.UserType!=="Admin"){
    return res.status(401).json({mesasge:"UnAuthorized Permission"})

}
next()




}

//verify employee

module.exports.verifyEmployee = function(req,res,next){

    if(!req.user)
    {
    
        return res.status(401).json({mesasge:"UnAuthorized User"})
    }
    else if(req.user.UserType!=="Employee"){
        return res.status(401).json({mesasge:"UnAuthorized Permission"})
    
    }
    next()
    
    
    
    
    }




//for norrmal user

// module.exports.verifyAdmin = function(req,res,next){

//     if(!req.user)
//     {
    
//         return res.status(401).json({mesasge:"UnAuthorized User"})
//     }
//     else if(req.user.UserType!=="Customer"){
//         return res.status(401).json({mesasge:"UnAuthorized Permission"})
    
//     }
//     next()
    
    
    
    
//     }
