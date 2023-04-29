const mongoose = require("mongoose")

const EmployeesSchema = new mongoose.Schema({
  "name" : {
    type : String,
    required : true
  },
  "age" : {
    type : Number,
    required : true
  },
  "technology" : {
    type : String,
    required : true
  },
  "id" : {
    type : Number,
    required : true,
    unique : true
  }
})

module.exports = mongoose.model("employees", EmployeesSchema)