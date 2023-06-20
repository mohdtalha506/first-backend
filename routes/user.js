const express = require("express");
const { userModel } = require("../models/usersModel");
const auth = require("../middleware/auth");
const userRouter = express.Router();

//getAll
userRouter.post("/getall",auth, async(req, res)=>{
    try{
        const userList = await userModel.find();
        res.send(userList)
    }catch(error){
        res.send({ "msg":"Soething Went Wrong", "error": error.message })
    }
});

//insert
userRouter.post("/insert", auth,async(req, res)=>{
    try{
        const {name, email} = req.body;
        const obj = await new userModel({
            name,
            email,
        });
       const users = await obj.save();
        if(!users) {
            res.send({
                status: 0,
                message: "Something went wrong with user Insertion",
                data: "",
              });
        }
        res.send({
            status: 1,
            message: "User inserted Successfully.",
            data: users,
          });
    }catch(error){
        if (error.message.includes("duplicate key")) {
            if (error.message.includes("name:")) {
              res.send({
                status: 0,
                message: "User name already exists.",
                data: "",
              });
            }
          } else {
            res.send({ status: 0, message: "Something went wrong.", data: "" });
          }
    }
});

//update
userRouter.post("/update",auth, async(req,res) =>{
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
userRouter.post("/delete", auth, async(req,res) => {
    const { id } = req.body;
    try{
         await userModel.findOneAndDelete({ _id: id });
        res.send("User Deleted Successfully !")
    }catch(error){
        res.send({ "msg":"Something went Wrong","error":error.message })
    }
});


module.exports = { userRouter }