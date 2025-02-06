const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
const { result } = require("lodash");
const Blog = require("./models/blog");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

// express app
const app = express();

//connect to mongodb
const dbURI = "mongodb+srv://netninja:anajamil123@cluster0.ju423.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI)
    .then((result) => {
        console.log('connected to db');
        // listen for requests
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });

app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static("public"));
app.use(morgan("dev"))

// mongoose and mango sandbox routes
app.get("/add-blog", (req, res) => {
    const blog = new Blog({
        title: "new blog",
        snippet: "about my new blog",
        body: "more about my new blog"
    });
    blog.save()
        .then((res) => {
            res.send(res);
        })
        .catch((err) => {
            console.log(err);
        })
})

// app.get("/", (req, res) => {
    //     // res.send("<p>Home Page</p>");
//     res.sendFile("./views/index.html", { root: __dirname });
// });
app.get("/", (req, res) => {
    const blogs = [
        {title: 'Yoshi Finds Eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario Finds Eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How To Defeat Bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'}
    ]
    res.render("index", { title: 'Home', blogs /* <=> blogs: blogs */ });
})

// app.get("/about", (req, res) => {
    //     // res.send("<p>About Page</p>")
//     res.sendFile("./views/about.html", { root: __dirname })
// })
app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
})
app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create a new Blog" });
})
// redirects
// app.get("/about-us", (req, res) => {
    //     res.redirect("/about");
// })

// error handeling
// app.use((req, res) => {
    //     // res.sendFile("./views/404.html", { root: __dirname });
//     res.status(404).sendFile("./views/404.html", { root: __dirname });
// });
app.use((req, res) => {
    res.render("404", { title: "404" });
})