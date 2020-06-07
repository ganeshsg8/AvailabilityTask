/**
 * @author Ganesh Sharma
 * @description server configuration and router initialization
 * 
*/
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// configuration object import
const { mongoDev, mongoOptions, port } = require('./config');
//routes import
const router = require('./routes');

const app = express();

// index page as static file serve
app.use('/index', express.static(path.resolve(__dirname, 'pages')));

app.use(bodyParser.json());
app.use(cors());

app.use('/api', router);

mongoose.connect(mongoDev, mongoOptions, function (err) {
    if (err) {
        console.log(err);
        process.exit();
    } else {
        app.listen(port, () => {
            console.log(`Server Listening On ${port}`);
        });
    }
});