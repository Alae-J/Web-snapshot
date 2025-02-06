
const http = require('http');
const fs = require("fs");
const _ = require("lodash")

// const server = http.createServer((req, res) => {
//     console.log(req.url, res.method);

//     // set header content type 1. set the 
//     res.setHeader("Content-Type", "text/plain"); // 1. set the header for the content type being sent to back to the browser
//     res.write("hello, ninjas"); // 2. writing whatever content we want to send back to the browser
//     res.end(); // 3. Ending the response which then sends it to the browser
// });

// const server = http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'text/html');
//     res.write("<head><link rel='stylesheet' href='#'</head>")
//     res.write("<p>Hello, Ninjas</p>");
//     res.write("<p>Alae is here!</p>");
//     res.end();
// })

const server = http.createServer((req, res) => {
    // lodash
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log("Hello");
    });

    greet();
    greet();

    res.setHeader("Content-Type", "text/html");

    let path = './';
    switch (req.url) {
        case "/":
            path += "../INPT-Website/index.html";
            res.statusCode = 200;
            break;
        case "/about":
            path += "../INPT-Website/about.html";
            res.statusCode = 200;
            break;
        case "/about-blah": // redirection to /about
            res.statusCode = 301;
            res.setHeader("Location", "/about");
            break;
        default:
            path += "404.html";
            res.statusCode = 404;
            break;
    }

    // Send an html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }create
        else {

            // res.write(data);
            res.end(data);
        }
    });
})

server.listen(3000, 'localhost', () => { // 'localhost' means listen for requests coming to our own computer (we use our own computer as a host)
    console.log("listening for requests on port 3000");
})