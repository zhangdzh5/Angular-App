const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require('./models/post');

const databaseUrl = "mongodb+srv://dzhang40:Beckham,0701@cluster0.nplgh.mongodb.net/dzhang40?retryWrites=true&w=majority";

mongoose.connect(databaseUrl,{
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(()=> {
	console.log("Connected to DB!");
}).catch(err => {
	console.log("ERROR: ", err.message);
});

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/new', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully!'
  });
});


app.get('/new',(req, res, next) => {
  Post.find().then(docs => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: docs
    });
  });
});

module.exports = app;
