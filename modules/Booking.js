const mongoose = require('mongoose');

const date = new Date()

const bschema =new mongoose.Schema({
  
UserId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'User',
  require:true
},

ProductId:[
{
food:{
  type:mongoose.Schema.Types.ObjectId,
ref:'Food'
},
qty:{
  type:Number,
default:1}

}]
,
Date:{
  type:String,
  default:`${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`
}

})


bschema.methods.editCart = function (foodItem, newQty) {
  const foodIndex = this.ProductId.findIndex((cf) => {
    return cf.food._id.toString() === foodItem._id.toString();
  });

  if (newQty < 1) {
    const updatedItems = this.ProductId.filter((cf) => {
      return cf.food._id.toString() !== foodItem._id.toString();
    });
    this.ProductId = updatedItems;
    return this.save();
  } else {
    if (foodIndex >= 0) {
      let updatedItems = [...this.ProductId];
      updatedItems[foodIndex].qty = newQty;

      this.ProductId = updatedItems;
      return this.save();
    } else {
      return new Promise.reject();
    }
  }
};

const Booking = mongoose.model('Booking',bschema);

module.exports =Booking