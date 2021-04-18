
const express = require('express');
const { verifyUser, verifyAdmin } = require('../middleware/auth');
const router = express.Router()
const upload = require('../middleware/upload')
const Restaurant = require('../modules/Resturant')
router.post( '/addResturant',verifyUser,verifyAdmin,(req, res) => {
  console.log("add resturant")
 


    const name = req.body.name;
    const foodType = req.body.foodType;
    const pincode = req.body.pincode;
    const address = req.body.address;
    const phone = req.body.phone;
    const rating = req.body.rating;
  console.log(req.body.rating)
    const restaurant = new Restaurant({
      name: name,
      foodType: foodType,
      pincode: pincode,
      address: address,
      phone: phone,
      rating:rating
    });
  
    restaurant
      .save()
      .then((data) => {
        return res.json({success:true,data:restaurant});
    
      })
      .catch((err) => {
        return AppError.onError(res, "restaurant add error" + err);
      });
      
  });
  router.put( '/upResturant/:id',verifyUser,verifyAdmin,upload.single('images'),(req, res) => {

  if(req.file){
    const file = req.file
 
  
    Restaurant.findByIdAndUpdate({_id:req.params.id},{
     
      images:file.filename,
     
    })
    
      .then((data) => {
        return res.json({success:true});
    
      })
      .catch((err) => {
        return AppError.onError(res, "restaurant add error" + err);
      });


  }
   else{

    Restaurant.findByIdAndUpdate({_id:req.params.id},{
      name: name,
      foodType: foodType,
      pincode: pincode,
      address: address,
      phone: phone,
      
    })
      .then((data) => {
        return res.json({success:true});
    
      })
      .catch((err) => {
        return AppError.onError(res, "restaurant add error" + err);
      });

   }
       
    });
  




  router.get('/getRest/:id',function(req,res){

    Restaurant.findOne({_id:req.params.id}).populate('foods').then((data)=>{
console.log(data)
res.status(200).json({success:true,data:data})

    })



  })



router.get('/getRest',(req, res, next) => {

    Restaurant.find().populate('foods')
      .then((restaurants) => {
        console.log(restaurants)
        res.status(200).json({success:true,data:restaurants});
      })
      .catch((err) => {
        return AppError.onError(res, "restaurant add error" + err);
      });
  });
  

router.delete('/rest/:id',function(req,res){

  Restaurant.deleteOne({_id:req.params.id}).then(function(result){

    res.status(200).json({success:true})
  })
})


module.exports =router