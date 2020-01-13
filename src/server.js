const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const PORT = 3000;
const HOST = '0.0.0.0';

const server = () => {
  const app = express();
  const db = mongoose.connection;

  mongoose.connect('mongodb://mongo:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  db.on('error', console.error.bind(console, 'Connection error: '));
  db.once('open', () => {
    console.log('DB Connected');

    app.use(cors());

    app.get('/', (req, res) => res.send('It works!'));

    app.listen(PORT, HOST, () => console.log(`Listening on ${PORT}`));
  });
};

module.exports = { server };
