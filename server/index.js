const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router');

const app = express();

// DB SETUP
mongoose.connect('mongodb://localhost/auth', {
  useMongoClient: true
});

// APP SETUP
app.use(morgan('combined')); // logging
app.use(cors()); // open up API to CORS
app.use(bodyParser.json({ type: '*/*'})); // parse response body

router(app);

// SERVER SETUP
const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
