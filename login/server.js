const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
// public when we load the file on the localhost
// tha these static file would not upload there
// thats why we move to these file in the public folder
// and set the path according to this like public -> css ->style.css

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendfile(__dirname + "/login.html");
});

app.post("/", function (req, resp) {
  var user_email = req.body.input_email;
  var lastName = req.body.pass;

  var userEmail = req.body.email;

  console.log(firstName, lastName, userEmail);

  // https request data
  const mcData = {
    members: [
      {
        email: userEmail,
        status: "pending",
      },
    ],
  };
  const mcDataPost = JSON.stringify(mcData);

  const options = {
    url: "",
    method: "POST",
    headers: {
      Authorization: "auth..",
    },
  };
  request(options, function (errors, resp, body) {});
  // console.log(fname ,lname , email)
});
app.listen(3000, function (req, resp) {
  console.log("server is running at the 3000 port");
});
