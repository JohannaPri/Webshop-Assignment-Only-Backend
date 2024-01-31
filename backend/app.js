const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { MongoClient } = require('mongodb');
const mongoClient = require('mongodb').MongoClient;

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoClient.connect("mongodb://127.0.0.1:27017")
.then(client => {
    console.log("The database is connected");

    const db = client.db("Johanna-LarssonPrinz");
    app.locals.db = db;
});


// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
