const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const { routes } = require('./routes');

const PORT = 3000;
const HOST = '0.0.0.0';
const DATABASE = 'vuttr';

const runServer = () => {
  const app = express();
  const db = mongoose.connection;

  // Not localhost because of docker
  mongoose.connect(`mongodb://mongo:27017/${DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  db.on('error', console.error.bind(console, 'Connection error: '));
  db.once('open', () => {
    console.log('Connected to database');

    app.use(bodyParser.json({ type: 'application/json', limit: '5mb' }));
    app.use(cors());
    app.use('/', routes());

    app.listen(PORT, HOST, () => console.log(`Listening on ${PORT}`));
  });
};

module.exports = { runServer };
