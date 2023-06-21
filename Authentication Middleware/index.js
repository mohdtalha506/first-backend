const express = require("express");
const app = express();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/users.routes");
const { userAuthenticate } = require("./middleware/user.middleware");
const cors = require("cors")


app.use(express.json());
app.use(cors({origin:"*"}));

app.use("/user",userAuthenticate,userRouter)

app.get("/",(req,res)=>{

    res.send("HOME PAGE")
});

app.listen(4000, async ()=>{
    
    try{
        await connection;
        console.log("connected to database")
    }catch(err){
        console.log("connection to database failed")
    }
    console.log("connected to server");
})