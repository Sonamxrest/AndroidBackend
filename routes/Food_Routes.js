const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const Food = require('../modules/Food')
const auth = require('../middleware/auth')
const Restaurant = require('../modules/Resturant')
const { verifyUser, verifyAdmin } = require('../middleware/auth');



router.put('/food/photo/:id',upload.single('Image'),function(req,res){
const id = req.params.id
const file = req.file
  Food.findById({_id:id}).then(function(rs){
    console.log(file)
    Food.findByIdAndUpdate({_id:id},{
        Image:file.filename
      }).then(function(result){
        
            res.status(200).json({success:true,message:"Updated",food:rs})
          
        })
  })

})



router.get('/food/show',function(req,res){

console.log(req.user)
Food.find().then(function(result){

res.status(200).json({status:true,data:result})

})



})


router.get('/search/:name',(req,res)=>{

Food.find({Name:{$regex:req.params.name,$options:'$i'}}).then((data)=>{
  res.status(200).json({success:true,data:data})
})

})

router.get('/food/show/:id',function(req,res){

console.log("Magyo")
const id = req.params.id
Food.findById({_id:id}).then(function(data){
  res.status(200).json({status:true,data:data})
  console.log(data)
})
}) 
  
router.post('/add/:rid', (req, res, next) => {
 
const name = req.body.Name
const description = req.body.Description
const rating = req.body.Rating
const price = req.body.Price
const time = req.body.time;
let food 
  let currentRestaurant;
const restaurantId = req.params.rid
  Restaurant.findById(restaurantId)
    .then((restaurant) => {
      currentRestaurant = restaurant;
       food = new Food({
        Name:name,Description:description,Rating:rating,Price:price,time:time
      });

      food.save().then(function(r){

        return res.status(200).json({success:true,food:food._id});
      })
    })
    .then((good) => {
      currentRestaurant.foods.push(food._id);
      return currentRestaurant.save();
    })
    .then((result) => {
      
    })
    .catch((err) => {
      err.statusCode = 503;
      next(err);
    });
});


router.put('/updateFood/:id',upload.single('Image'),function(req,res){

  const name = req.body.Name
  const description = req.body.Description
  const rating = req.body.Rating
  const price = req.body.Price
  const time = req.body.time;
console.log("Update")
  const image ="no-img.jpg"
  if(req.file){
    image= req.file.filename
  }Food.findByIdAndUpdate({_id:req.params.id},{

    Name:name,
    Description:description,
    Rating:rating,
    Price:price,
    Image:image
  }).then(function(data){
res.status(200).json({success:true,message:"Update Item"})

  })



})



router.delete('/deleteFood/:id/:rid',function(req,res){
  const id = req.params.id
const rid = req.params.id
Food.findOneAndDelete({_id:req.params.id}).then(function(response){
Restaurant.findOneAndUpdate({_id:rid},{

$pull:{foods:{id}}

}).then(function(re){
  res.status(200).json({success:true,message:"One Food deleted"})
})
})


})

module.exports = router




