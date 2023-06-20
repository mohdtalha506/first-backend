const mongoose = require("mongoose");

const dburl = "mongodb+srv://talhamohd2376:2376@cluster0.tw3ztii.mongodb.net/UserTable"

mongoose.connect(dburl).then(()=>console.log("Mongodb Connected"));