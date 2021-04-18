const mongoose = require('mongoose')
const Food = mongoose.model('Food',{


Name:{
    type:String,
    require:true
},
Description:{
    type:String
},

Rating:{
    type:Number,
    default:3
},
Price:{
    type:Number,
    require:true
},
Image:{
    type:String,
    default:"no-image.jpg"
},
time:{
    type:String
},
resturant:{

    type:mongoose.Schema.Types.ObjectId,
    ref:'Restuarant'
}
,category:{
    type:String,
    enum:["Nepali","Chinese","Indian"]
}


})

module.exports = Food