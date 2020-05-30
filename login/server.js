const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const app = express();


app.use(express.static(__dirname + '/public'));
// public when we load the file on the localhost
// tha these static file would not upload there
// thats why we move to these file in the public folder
// and set the path according to this like public -> css ->style.css
app.use(bodyParser.urlencoded({extended: true}));

//connection to Database


// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'murti123',
//   database: 'project'
// });

connection.connect(function (error) {
  if (!!error) {
    console.log("Error in the connection");
  } else {
    console.log("Database connected")
  }
});






app.get("/", function (req, res) {
  console.log("        Now working on the login.html file            ");
  res.sendFile(__dirname + "/public/login.html");
});




app.post("/", function (req, res) {
  console.log("        Now working on the login.html file            ");
  // res.sendFile(__dirname + "/public/login.html");

  console.log(res.body.input_email)

  connection.query('Select * from tablename ', function (error, rows, fields) {
    if (!!error) {
      console.log("Error in the Query");
    } else {
      console.log("query successfull");
      console.log(rows);
      res.send(rows);

  //   }
  })






// });





// app.get("/register.html", function (req, res) {
//   console.log("---------register file has been passed")
//   res.sendFile(__dirname + "public/register.html");

// });


// app.get("/products.html", function (req, res) {
//   console.log("---------index file has been passed");
//   res.sendFile(__dirname + "public/products.html");

// });




// app.get("/login.html", function (req, res) {
//   console.log("---------login file has been passed")
//   res.sendFile(__dirname + "....public/login.html");

//   var user_email = req.body.input_email;
//   var user_pass = req.body.pass;

//   console.log(user_email)
//   console.log(user_pass)

//   if (user_email === DataBase.user[0].user_email && user_pass === DataBase.user[0].user_pass) {
//     console.log("succed")
//   } else {
//     console.log("please Try again ")
//   }

// });









// app.post("/login.html", function (req, resp) {


// });
app.listen(3000, function (req, resp) {
  console.log("server is update running at the 3000 port");
});