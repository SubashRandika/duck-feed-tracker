const express = require('express');
const mongoose = require('mongoose');

const app = express();

// use body parser middleware to parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: false }));
// use body parser middleware to parse json request payload
app.use(bodyParser.json());

// use env variables port if not default 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
