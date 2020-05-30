const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')
const session = require('express-session');

const app = express();

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


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
    console.log("working at login.html");
    resp.sendFile(__dirname + "/public/login.html");

    req.statusCode = 200;

});
app.post('/', function (req, resp) {


    var useremail = req.body.input_email;
    var password = req.body.pass;
    console.log(useremail, password)
    if (useremail && password) {
        connection.query('SELECT * FROM registered_person WHERE email = ? AND pass = ?', [useremail, password], function (error, results, fields) {
            if (!!error) {
                resp.send("Error in the query")
            }

            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.user_email =useremail ;
                req.session.password = password;
                resp.redirect('/main.html');
            } else {
                // bad may yha error.html ki file send kar dyna wapiss
                resp.send('Incorrect Username and/or Password!');
            }
            resp.end();
        });
    } else {
        resp.send('Please enter Username and Password!');
        resp.end();
    }










    // resp.writeHead(200);
    // resp.send(req.body.input_email);
    // resp.setHeader('Content-Type', 'text/html');
    // resp.send(json(req.body.pass));
    // resp.end();

    // resp.redirect(301, '/login')
    // connection.query('SELECT * FROM registered_person ', function (error, rows, fields) {
    //     if (!!error) 
    //     {
    //         console.log("Error in the Query");

    //     } 
    //     else 
    //     {
    //         console.log("query successfull");
    //         console.log(rows);
    //         resp.send(rows[0]);

    //     }
    //     });

    // console.log(req.body);


});



app.post('/register.html', function (req, resp) {
    console.log(" register in the post method")
    resp.send(req.body)

    const database = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.user_email,
        pass: req.body.passw
    };
    //just checking
    // console.log(database.fname);
    // console.log(database.lname);
    // console.log(database.email);
    // console.log(database.pass);
    var query = "INSERT INTO registered_person(FirstName , LastName ,email ,pass) VALUES( ? , ? , ? , ?)";
    var object = [database.fname, database.lname, database.email, database.passw];
    connection.query(query, object, function (error, rows, fields) {
        if (!!error) {
            console.log("Error in the Query");

        } else {
            console.log("query succeed");
            // const query_Data = rows;
            resp.send(rows);

            // var myjson = json.stringify(rows);
            // console.log(myjson)
        }

    });



});

// app.get('/main.html', function (req, resp) {

//     console.log("working at main.html");
//     resp.sendFile(__dirname + "/public/main.html");
// });


app.post('/main.html', function (req, resp) {

    console.log("working at post main.html");
    resp.send("back")


});


app.get('/products.html', function (req, resp) {

    console.log("working at product.html");
    resp.sendFile(__dirname + "/public/products.html");
});

app.post('/products.html', function (req, resp) {

    console.log(req.body.button)
    console.log("working at post of products,html")
    connection.query('select * from registered_person', function (error, rows, fields) {
        if (!!error) {
            resp.send("Error in the Query")
        } else {
            resp.send("query Succeed")
        }
    })
})











app.listen(3000, function (req, resp) {
    console.log("server is listen at 3000 port");
});