const express = require('express');
const app = express();
const users = require('./routes/users');
const oauth = require('./routes/oauth');
const bodyParser = require('body-parser');
require('dotenv').config({path: __dirname + '/.env'});

const port = process.env.PORT ?? 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/users', users);
app.use('/oauth', oauth);

app.get('/', (req, res) => {
    return res.status(200).send('ok');
})


app.listen(port, err => {
    console.log(`listening on port ${port}`);
});