const mongoose = require("mongoose");

const dburl = "mongodb+srv://talhamohd2376:2376@cluster0.tw3ztii.mongodb.net/UserTable?retryWrites=true&w=majority"

mongoose
.connect(dburl,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: "UserTable",
}).then(()=>console.log("Mongodb Connected"));