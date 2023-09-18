const express = require('express');
const bodyParser = require('body-parser');
const apiList = require('./routes/api-list');

const app = express();


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/apiList', apiList);

app.listen(80);