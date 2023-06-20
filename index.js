const express = require("express");
const app = express();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user")
const cors =require("cors");

app.use(express.json());
app.use(cors({origin:"*"}));
app.use("/users",userRouter);

const  PORT = 3002;

app.get("/", async(req,res)=>{
    try{
        res.send("Home")
    }catch(error){
        res.send({ "msg":"Something went Wrong","error":error.message })
    }
})

app.listen(PORT, async(req,res)=>{
    try{
        await connection;
        console.log("Connected to Database");
    }catch(error){
        console.log("Cant connect to Database");
    }
})