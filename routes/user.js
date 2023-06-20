const express = require("express");
const { userModel } = require("../models/usersModel");
const userRouter = express.Router();

//getAll
userRouter.post("/getall", async(req, res)=>{
    try{
        const userList = await userModel.find();
        res.send(userList)
    }catch(error){
        res.send({ "msg":"Soething Went Wrong", "error": error.message })
    }
});

//insert
userRouter.post("/insert", async(req, res)=>{
    const newUser = req.body;
    try{
        const user = new userModel(newUser);
        await user.save();
        res.send("New User Added Successfully !")
    }catch(error){
        res.send({ "msg":"Something went wrong","error":error.message })
    }
});

//update
userRouter.post("/update", async(req,res) =>{
    const { id,name, email } = req.body;
    
    try{
        const user = await userModel.findOneAndUpdate(
        {_id:id},
        {
            name,
            email
        },
        { new: true}
        );
        res.send("User Updated Successfully !")
    }catch(error){
        res.send({ "msg":"Something went wrong","error":error.message })
    }
 })

//delete
userRouter.post("/delete", async(req,res) => {
    const { id } = req.body;
    try{
         await userModel.findOneAndDelete({ _id: id });
        res.send("User Deleted Successfully !")
    }catch(error){
        res.send({ "msg":"Something went Wrong","error":error.message })
    }
});

module.exports = { userRouter }