const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
// public when we load the file on the localhost
// tha these static file would not upload there
// thats why we move to these file in the public folder
// and set the path according to this like public -> css ->style.css


const DataBase = {

  user : [
    {
    user_email : "iffishells@gmail.com",
    user_pass : "gmail786"
  
    },
    {
      user_email : "123@gmail.com",
      user_pass : "123"
    }
  ]
}


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.post("/", function (req, resp ) {

    var user_email = req.body.input_email;
    var user_pass = req.body.pass;

    console.log(user_email)
    console.log(user_pass)

    if(user_email === DataBase.user[0].user_email && user_pass === DataBase.user[0].user_pass ){
      console.log("succed")
    }else{
      console.log("please Try again ")
    }
});
app.listen(3000, function (req, resp) {
  console.log("server is running at the 3000 port");
});
