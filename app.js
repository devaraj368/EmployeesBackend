// Task1: initiate app and run server at 3000
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')
const employeeData = require('./employeeModel')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
const PORT = 3000; 

// task 1 ends here

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 
  const connectDB =     
  "mongodb+srv://devarajp368:devaraj1@cluster0.fl8wohu.mongodb.net/EmployeeDB" ;
    mongoose.connect(connectDB, {useNewUrlParser: true, useUnifiedTopology: true});

      

//Task 3 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', (req, res)=>{
    employeeData.find().then((employeeDetail) => {
        res.send(employeeDetail);
      });
})


//TODO: get single data from db  using api '/api/employeelist/:id'


app.get('/api/employeelist/:id', (req, res)=>{
    const id = req.params.id;
    employeeData.findOne({ _id: id }).then((empData) => {
    res.send(empData);
  });
})


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post("/api/employeelist", (req, res) => {
  var empDetails = {
    name: req.body.name,
    location: req.body.location,
    position: req.body.position,
    salary: req.body.salary,
  };
  var employeeDatas = employeeData(empDetails);
  employeeDatas.save();

  employeeData.find().then((employeeDetails) => {
    res.send(employeeDetails);
  });
});




//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete("/api/employeelist/:id", (req, res) => {
  console.log("Deleting");
  employeeData.findByIdAndRemove(req.params.id)
    .then(employeeDelete => {
      res.json(employeeDelete);
    })
    .catch(err => {
      res.send("Error in deleting the Emp details");
    });
});






//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put("/api/employeelist", (req, res) => {
  var id = req.params.id;
  var  name= req.params.name;
  var  location= req.params.location;
  var  position= req.params.position;
  var  salary= req.params.salary;

  console.log(req.body);
  (id = req.body._id),
    (name = req.body.name),
    (location = req.body.location),
    (position = req.body.position),
    (salary = req.body.salary),
    employeeData
      .findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            name: req.body.name,
            location: req.body.location,
            position: req.body.position,
            salary: req.body.salary,
          },
        }
      )
      .then(() => {
        res.send();
      });
});




//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


app.listen(PORT, ()=>{
    console.log(`Sucessfully running on port ${PORT}`);
} )
