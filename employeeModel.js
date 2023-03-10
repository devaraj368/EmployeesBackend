const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: String,
    location: String,
    position: String,
    salary: String,
  });

 const employeeData = mongoose.model("employeeDetails", employeeSchema);

 module.exports  = employeeData;