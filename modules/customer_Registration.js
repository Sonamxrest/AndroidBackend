const mongoose = require('mongoose')
const User = mongoose.model('User',{
FirstName:{
    type:String
},
Lastname:{
    type:String
},
Gender:{
    type:String
},
Address:{
    type:String
},
PhoneNumber:{
    type:String
},
Username:{
    type:String
},
Password:{
    type:String
},
Profile:{
    type:String,
    default:"no-img.jpg"
}
,
UserType:{
    type:String,
    enum:['Admin','Customer','Employee']  ,
    default:"Customer"
}


})





module.exports= User

