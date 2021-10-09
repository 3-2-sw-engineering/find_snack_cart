const express = require('express')
const app = express();

const port = 5000;
const router = require('./routes/routes');

const config = require('./config/key');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', router);

app.listen(port, () => console.log(`listening on port ${port}`));