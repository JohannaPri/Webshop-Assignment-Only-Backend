const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { MongoClient } = require('mongodb');
const mongoClient = require('mongodb').MongoClient;

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const MONGODB_URI = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'johanna-larssonprinz';

mongoClient.connect(MONGODB_URI)
.then(client => {
    console.log("The database is connected");

    const db = client.db(DB_NAME);
    app.locals.db = db;

    app.use('/api/users', usersRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/orders', ordersRouter);
});

module.exports = app;

