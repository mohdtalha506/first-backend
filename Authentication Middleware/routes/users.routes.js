const express = require("express");
const { userModel } = require("../model/user.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const userRouter = express.Router();

//-----------------------------------------all user routes----------------------------------------------------

userRouter.get("/allusers", async (req,res) => {

    try{
        let all_users = await userModel.find();
        res.send(all_users)
    }catch(err){
        res.send({ "msg": "can't fetch users,something went wrong", "error": err.message });
        // console.log(err)
        // res.send(err)
    }
});

//-------------------------------------- USER LOGIN ROUTE --------------------------------------------------------

userRouter.post("/login", async (req,res) => {

    const { email, password } = req.body;
    console.log("email:",email,"password:",password)

    try{
        const data = await userModel.find({ email });
        console.log("data:",data)

        if(data.length > 0){

            bcrypt.compare(password,data[0].password, (err, result) => {
                
                console.log("result",result)
                console.log("error:",err)
                if(result){

                    const token = jwt.sign({...data[0]}, "masai",{expiresIn: "1h"});
                    res.send({"msg":"login succuess","token":token});
                
                }else if(err){

                    
                    res.send({"msg":"wrong crendentials","error":err.message})
                }
                
            });
        }else {

            res.send({"msg":"user not found, check email or password or if new user then register","error":err.message});
        }
    }catch(err){
        res.send({ "msg": "can't login,something went wrong", "error": err.message })
    }
});

//----------------------------------------------REGISTER ROUTE---------------------------------------------------------------

userRouter.post("/adduser", async (req,res) => {
    
    const {username,email,role,password} = req.body;
    
    try{
        bcrypt.hash(password, 5 , async ( err, encryptedPass ) =>{
            
            if(err){
                res.send({"error":err.message})
            }else{
                
                const newUser = new userModel({username,email,role, password: encryptedPass});
                await newUser.save();
                res.send("registration success");

            }
        })
    }catch(err){

        res.send({ "msg": "can't register,something went wrong", "error": err.message });
    }
});

//---------------------------------------------------UPDATE USER INFO ROUTE-----------------------------------------------------

userRouter.patch("/update/:id", async (req, res) => {
    const _id = req.params.id;
    const payload = req.body;
    try {
        await userModel.findByIdAndUpdate({ _id }, payload)
        res.send("user info updated successfuly")
    } catch (err) {
        res.send({ "msg": "can't update user,something went wrong", "error": err.message })
    }
    // res.send("update details of a particular user");
});


module.exports = { userRouter };



// {
//     "username":"abhijeetKale",
//       "email":"abhijeetKale@gmail.com",
//       "DOB":"20/09/1994",
//       "role":"full stack",
//       "location":"bangalore",
//       "password":"abhicandothis",
//       "confirm_password":"abhicandothis"
// }