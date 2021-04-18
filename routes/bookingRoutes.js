const { json } = require('express')
const express = require('express')
const { verifyUser } = require('../middleware/auth')
const router = express.Router()
const Booking = require('../modules/Booking')
const Food = require('../modules/Food')

const date = new Date().toLocaleDateString("en-IN").split("/").toString()

router.post('/booking/:pid',verifyUser,function(req,res){
const uid= req.user._id
const pid= req.params.pid
const qtys = req.body.Qty
console.log(qtys)
var map = []
var obj
let book
obj = {food:pid,qty:qtys}
map.push(obj)

Booking.findOne({UserId:uid}).then(function(book){

  
    if(!book)
    {

        const booking = new Booking({UserId:uid,ProductId:[obj]})
        booking.save().then(function(result){
    
            res.status(200).json({success:true,booking:true,data:booking})
    
        }).catch(function(error){
    res.status(500).json({success:false})
    
        })
    }
    else{
var newBooking =[]
newBooking= book.ProductId
var index =0
var data =0
var milyo

for(data =0;data<newBooking.length;data++){

  if(newBooking[data].food==pid)
  {
    milyo =true
    index = data
    
break;
  }
  
  
}
if(milyo==true){

  newBooking[index].qty+=qtys
}
else{

  newBooking.push(obj)
}



Booking.findOneAndReplace({UserId:uid},{
    UserId:uid,
    ProductId:newBooking
}).then(function(s){
    return  res.status(200).json({success:true,booking:true,data:newBooking})
 
})





    }



})


    


})



//productId is an object of Food wit quantity

router.get('/booking/show',verifyUser,function(req,res){

    var user = req.user._id

    Booking.findOne({ UserId: user }).populate('UserId').populate({path:'ProductId.food'}).then(function(result){
console.log(result)
let total=0

if(result===null){
  console.log("Data xaina")
  res.status(200).json({status:false,data:null,count:0,Qty:0})


}
else{

  result.ProductId.map((item)=>{

    let qty = item.qty
    let price = item.food.Price;
     total += price * qty
  })
  console.log(total)
      res.status(200).json({status:true,data:result,count:result.ProductId.length,Qty:total,id:req.user._id})
  
     
}


}).catch(function(err){

    res.status(500).json({success:false,error:err})
    console.log(err)
})

 
})

router.put('/delete/booking/:oid',verifyUser,function(req,res){
const id =req.user._id
console.log("Hanyo")
   Booking.findOneAndUpdate({UserId:id},{
     $pull: { ProductId: { _id: req.params.oid }  },

   }).then(function(s){

    res.status(200).json({success:true,data:s})
   }).catch((error)=>{
     console.log(error)
   })
})


router.put('/updatebooking/:pid',verifyUser,function(req,res,next){
  const qty = req.body.Qty
  console.log(qty)
const uid = req.user._id
const pid = req.params.pid

  let book;
  Booking.findOne({UserId:uid})
    .populate("ProductId.food")
    .then((booking) => {
      book = booking;
      return Food.findById(pid);
    })
    .then((food) => {
      return book.editCart(food, qty);
    })
    .then((result) => {
      res.status(200).json({success:true});
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });















// let booking =[]
// let index 
// Booking.findOne({UserId:uid}).then(function(result){

// booking =result
// index = booking.ProductId.findIndex(pid)
// console.log(index)

// })




});

router.put('/deleteBooking',verifyUser,function(req,res){



    Booking.updateOne( {UserId: req.user._id}, 
        { $pullAll: {ProductId:[0],Qty:[3] }}).then(function(s){

        res.status(200).json({message:"Deleted"})
    })



})
router.delete('/deleteCart',verifyUser,function(req,res){

  Booking.findOneAndDelete({UserId:req.user._id}).then(function(result){

res,status(200).json({message:"Booking Deleted"})

  })
})



module.exports=router;