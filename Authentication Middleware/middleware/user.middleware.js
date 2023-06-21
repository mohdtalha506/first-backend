const jwt = require("jsonwebtoken");

const userAuthenticate = (req,res,next) => {

    const token = req.headers.authorization;
    // console.log("token:",token)
    if(req.path === "/" || req.path === "/login" || req.path === "/adduser" ){
        
        next();

    }else if(token){
        
        const decoded = jwt.verify(token,"masai");
        // console.log("decoded token:",decoded)

        if(decoded._doc.role === "admin"){

            next();
        }else{
            res.send("you are not authorized")
        }
    }else{
        res.send("pls login first")
    }
}


module.exports = { userAuthenticate }