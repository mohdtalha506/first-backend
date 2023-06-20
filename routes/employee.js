const express = require("express");
const employeeModel = require("../models/employee");
const auth = require("../middleware/auth");
const employee = express.Router();

employee.post("/insert", auth, async(req,res)=>{
    try{
        const { firstname, lastname, code } = req.body;
        const obj = await new employeeModel({
            firstname,
            lastname,
            code,
        });
         await obj.save();
         res.send("Employee Inserted Success");
    }catch(error){
      res.send({ "msg":"Something went wrong","error":error.message })
    }
})
module.exports = employee