const mongoose = require ("mongoose");

const userSchema = mongoose.Schema(
    {
        name :{
            type:String,
            require: true
        },
        email : {
            type:String,
            require:true
        }
    }
);

const userModel =mongoose.model("newUserList", userSchema);
module.exports = { userModel } ;
