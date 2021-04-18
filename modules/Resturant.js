const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurant = new Schema({
  name: {
    type: String,
    required: true,
  },
 
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  rating: {
    type: String,
  },
  images: {
    type: String,
  },
  foods: [
    { type: Schema.Types.ObjectId,
      ref: "Food"
    }
    
  ],
});
const retro =mongoose.model("Restaurant", restaurant);

module.exports = retro
