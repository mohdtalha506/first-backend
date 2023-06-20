const mongoose = require("mongoose");
const validator = require("validator");

const employeeSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
  
  },

  code: {
    type: String,

  },
},
{
  timestamps: true,
}
);

const employeeModel = mongoose.model("employees", employeeSchema);
module.exports = employeeModel;
