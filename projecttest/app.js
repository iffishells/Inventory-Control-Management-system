const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')

const app = express();

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({extended: true}));


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'murti123',
    database: 'project'
});


connection.connect(function (error) {
    if (!!error) {
        console.log("Error in the connection");
    } else {
        console.log("Database connected")
    }
});



app.get('/', function (req, resp) {
    // resp.setHeader('Content-Type', 'text/html');
    console.log(         "working at login.html" );
    resp.sendFile(__dirname + "/public/login.html");

   req.statusCode=200;

});
app.post('/', function (req, resp) {

    // resp.writeHead(200);
    // resp.send(req.body.input_email);
    // resp.setHeader('Content-Type', 'text/html');
    // resp.send(req.body.pass);
   
    // resp.redirect(301, '/login')
    connection.query('SELECT * FROM Store_Data ', function (error, rows, fields) {
        if (!!error) 
        {
            console.log("Error in the Query");
                        
        } 
        else 
        {
            console.log("query successfull");
            console.log(rows);
            resp.send(rows[0]);

        }
        });

    console.log(req.body);
    // console.log(resp.header)
    // resp.send(req.body);
    
    // resp.end();
    // resp.send(req.statusCode)

    });


// app.get('/register.html', function (req, resp) {
//     console.log(       "working at register.html          " )
//     resp.sendFile(__dirname + "/public/register.html")
    
// });
app.post('/register.html',function(req,resp){
    console.log(" register in the post method")
    resp.send(req.body)

    // console.log(req.body.fname);
    // console.log(req.body.lname);
    // console.log(req.body.user_email);
    // console.log(req.body.passw)
    
    const database =
     {  
        fname: req.body.fname,
        lname:req.body.lname,
        email:req.body.user_email,
        pass: req.body.passw
    };
    console.log(database.fname);
    console.log(database.lname);
    console.log(database.email);
    console.log(database.pass);
    var query = "INSERT INTO Store_Data VALUES(?, ? , ? , ? , ?)"
    var object = [7 ,database.fname ,database.lname , database.email , database.passw]
    connection.query(query,object, function (error, rows, fields) {
        if (!!error) 
        {
            console.log("Error in the Query");
                        
        } 
        else 
        {
            console.log("query successfull");
            console.log(rows);
            resp.send(rows[0]);

        }
        });











    


})
app.listen(3000, function (req, resp) {
    console.log("server is listen at 3000 port");
    });