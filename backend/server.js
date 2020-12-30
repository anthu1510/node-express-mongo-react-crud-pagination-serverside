require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const mongoose = require('mongoose');

// Routing Imports
const userRouter = require('./routes/users.router');

const app = express();

app.use(cors()); // accessing diffent port settings
app.use(express.json()); // body parser middleware
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

const port = process.env.PORT | 5000;

// Routing Configuration
app.use('/users', userRouter);

mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true});
const con = mongoose.connection;
con.on('error', console.error.bind(console, 'connection error:'));
con.once('open',() => {
    console.log('mongo db Connected...');
});

app.listen(port, () => {
    console.log(`server connected port is ${port}`);
});