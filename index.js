const express = require('express');
const bodyParser = require('body-parser');
const req = require('express/lib/request');
require('./server/connection');

const app = express()
app.use(bodyParser.json());

const userRouter = require('./apis/users/userRoutes');
const contactRouter= require('./apis/contacts/contactRouter');

app.use("/user",userRouter);
app.use('/contact',contactRouter)

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('Server up and running on http://localhost:3000');
})