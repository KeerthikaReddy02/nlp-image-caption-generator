const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const https = require("https");
const axios = require("axios");
const FormData = require("form-data");



//let alert = require('alert');

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/aboutus",function(req,res){
  return res.sendFile(__dirname+"/aboutus.html");
})

app.get("/",function(req,res){
  return res.sendFile(__dirname+"/home.html");
})

app.get("/convert",function(req,res){
  return res.sendFile(__dirname+"/convert.html");
})

app.post("/fileUpload",function(req,res){
// const form = new FormData();
 const file = req.body.file;
 console.log(file);
// form.append('files',file);
// console.log(form);
// const response = axios.post("http://127.0.0.1:5000/predict",{
//   files:{
//     "file":form
//   }
// })
// console.log(response.text);
})

app.get("/morefunctions",function(req,res){
  return res.sendFile(__dirname+"/morefunctions.html");
})

app.listen(process.env.PORT ||3000,()=>console.log("Server is running"));
