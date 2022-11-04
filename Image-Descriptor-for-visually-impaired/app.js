const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const https = require("https");
const axios = require("axios");
const FormData = require("form-data");
const gTTS = require('gtts');
var player = require('play-sound')(opts = {})
const translate = require("translate");

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

app.post("/func",function(req,res){
   var speech = req.body.result;
  setTimeout(function(){
     return res.render("morefunctions",{text:speech});
     return res.send();
},1000);
})

app.post("/speech",function(req,res){
   var speech = req.body.speech;
   var gtts = new gTTS(speech, 'en');
   gtts.save('./tmp/TextToSpeech.mp3', function (err, result) {
    if(err) { throw new Error(err) }
    player.play('./tmp/TextToSpeech.mp3', function(err){
    if (err) throw err
    })
    });
    setTimeout(function(){
       return res.render("morefunctions",{text:speech});
       return res.send();
  },1000);
})

async function translateString(str,translateTo){
  translate.engine="google";
  const foo = await translate(str,translateTo);
  var gtts = new gTTS(foo, 'hi');
  gtts.save('./tmp/TextToSpeechTranslated.mp3', function (err, result) {
   if(err) { throw new Error(err) }
   player.play('./tmp/TextToSpeechTranslated.mp3', function(err){
   if (err) throw err
   })
   });
   return;
}
app.post("/translate",function(req,res){
   var tran = req.body.translate;
   translateString(tran,"hi");
   setTimeout(function(){
      return res.render("morefunctions",{text:tran});
      return res.send();
 },1000);
})

app.listen(process.env.PORT ||3000,()=>console.log("Server is running"));
