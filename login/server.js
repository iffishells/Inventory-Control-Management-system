const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const pathjoin =require('path.join')

const app = express();

app.use(express.static(__dirname + '/public'));



// app.use(express.static('public'))

// public when we load the file on the localhost
// tha these static file would not upload there
// thats why we move to these file in the public folder
// and set the path according to this like public -> css ->style.css


// const DataBase = {

//   user : [
//     {
//     user_email : "iffishells@gmail.com",
//     user_pass : "gmail786"
//     },
//     {
//       user_email : "123@gmail.com",
//       user_pass : "123"
//     }
//   ]
// }


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  console.log(__dirname)
  res.sendFile(__dirname + "public/login.html");
  console.log("---------login file has been passed")
});


app.get("/register.html", function (req, res) {
  res.sendFile(__dirname + "public/register.html");
  console.log("---------register file has been passed")
});


app.get("/index.html", function (req, res) {
  res.sendFile(__dirname + "public/index.html");
  console.log("---------index file has been passed")
});


app.get("/login.html", function (req, res) {
  res.sendFile(__dirname + "public/login.html");
  console.log("---------login file has been passed")
});









// app.post("/", function (req, resp ) {

//     var user_email = req.body.input_email;
//     var user_pass = req.body.pass;

//     console.log(user_email)
//     console.log(user_pass)

//     if(user_email === DataBase.user[0].user_email && user_pass === DataBase.user[0].user_pass ){
//       console.log("succed")
//     }else{
//       console.log("please Try again ")
//     }
// });
app.listen(3000, function (req, resp) {
  console.log("server is running at the 3000 port");
});
