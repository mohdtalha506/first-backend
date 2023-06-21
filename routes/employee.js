const express = require("express");
const employeeModel = require("../models/employee");
const auth = require("../middleware/auth");
const employee = express.Router();
const multer = require("multer")

//uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PDF files are allowed.'), false);
    }
  };
  
  const upload = multer({ storage: storage, fileFilter: fileFilter });

employee.post('/upload', upload.single('image_url'), (req, res) => {
    // Access the uploaded file via req.file
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    // Process the uploaded file and store the necessary data in the database
  
    return res.status(200).json({ message: 'Image uploaded successfully' });
  });
  

//insert
employee.post("/insert", auth, async(req,res)=>{
    try{
        const { firstname, lastname, code,password } = req.body;
        const obj = new employeeModel({
            firstname,
            lastname,
            code,
            password
        });
         const employee = await obj.save();
         if (!employee) {
            res.send({
              status: 0,
              message: "Something went wrong",
              data: "",
            });
          }
          res.send({
            status: 1,
            message: "Employee inserted Successfully.",
            data: employee,
          });
    }catch(error){
        if (error.message.includes("duplicate key")) {
            if (error.message.includes("firstname")) {
              res.send({ status: 0,message: "Name already exists.", data: "",  });
            } else if(error.message.includes("code")){
                res.send({
                    status: 0,
                    message: "Employee code already exists.",
                    data: "",
                  });
            }
          } else {
            res.send({ status: 0, message: error.message, data: error });
          }
    }
})

//getall
employee.post("/getall", auth, async (req, res) => {
    try {
      const employee = await employeeModel.find();
      if (!employee) {
        res.send({
          status: 0,
          message: "Something went wrong.",
          data: "",
        });
      }
      res.send({
        status: 1,
        message: "Query executed Successfully.",
        data: employee,
      });
    } catch (error) {
      res.send({ status: 0, message: "Something went wrong.", data: "" });
    }
  });




module.exports = employee