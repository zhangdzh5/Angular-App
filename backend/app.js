const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require('./models/post');
const postsRoutes = require('./routes/posts');

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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postsRoutes);


module.exports = app;
