const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const { routes } = require('./routes');

const PORT = 3000;
const HOST = '0.0.0.0';

const runServer = () => {
  const app = express();
  const db = mongoose.connection;

  mongoose.connect('mongodb://mongo:27017/vuttr', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  db.on('error', console.error.bind(console, 'Connection error: '));
  db.once('open', () => {
    console.log('DB Connected');

    app.use(cors());

    app.use('/', routes());

    app.listen(PORT, HOST, () => console.log(`Listening on ${PORT}`));
  });

  // return app;
};

module.exports = { runServer };
