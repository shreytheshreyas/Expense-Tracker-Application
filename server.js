const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db')

//providing the location of the global variables
dotenv.config({path: './config/config.env'});

//obtaining the routes for the respective transactions
const transactions = require('./routes/transactions');

//connecting to the Database
connectDB();

const app = express();

//Body Parser Middleware
app.use(express.json());

//Setting development environment for morgan
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);

//This makes sure we make use of only one port during deployment
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*' , (req, res) => res.sendFile(path.resolve(__dirname,'client','build','index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running in port in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));