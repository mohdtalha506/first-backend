const mongoose = require ("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
    {
        name :{
            type:String,
            require: true,
            trim: true,
            unique: true,
        },
        email : {
            type:String,
            require:true
        },
        
    },
    {
        timestamps: true,
    }
);

const userModel =mongoose.model("newusers", userSchema);
module.exports = { userModel } ;
