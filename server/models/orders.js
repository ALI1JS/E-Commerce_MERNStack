const mongoose  =  require('mongoose');

const Orders = new mongoose.Schema({
    userID:{
        type:String,
        require:true
    },
    userName:String,
    orderPrice:String,
    orderCount:String,
    products:Array
});

module.exports.OrderModel= mongoose.model("Orders",Orders);