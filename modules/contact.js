const mongoose = require('mongoose')

const scheme = mongoose.scheme({


UserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users'
},
Comment:{
    type:String
}

})

const contact = mongoose.model(schema,'Contact')
module.exports = contact



