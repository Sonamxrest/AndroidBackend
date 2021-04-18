const mongoose = require('mongoose')
const date = new Date()


const oschema = mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    ,

    ProductId:[

        {
        
        food:{
          type:mongoose.Schema.Types.ObjectId,
        ref:'Food'
        
        },
        qty:Number
        
        }],
      totalAmount: {
        type: Number,
        required: true,
      },
      orderDate: {
        type: String,
        default:`${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`
      },
      paidThrough: {
    
        type: String,
        enum:["Cash","Card"],
        default:"Cash"
      },
      paymentResponse: {
        type: String,
        default:"Not-Paid"
      },
      orderStatus: {// delivered // cancelled // failed
        type: Boolean,
        default:false
      },
      DeliveredStatus:{
        type:Boolean,
        default:false
      },
      EmployeeId:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      },
      lat:{
        type:String,
        default:""
      },
      lng:{
        type:String,
        default:""
      },
      address:{
        type:String,
        default:""
      }




    
})
const Order = mongoose.model('Order',oschema)
module.exports =Order