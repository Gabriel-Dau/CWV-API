const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = 'cwv.txt';
const port = 3000;
const writeStream = fs.existsSync(path) ? fs.createWriteStream(path, { flags: 'a' }) : null;

const app = express();

app.use(cors());

app.post('/', bodyParser.json(), (req, res) => {
  if (req.body) {
    try {
      writeStream.write(`${JSON.stringify(req.body)}\n`);
      console.log('data added...', req.body.value);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send('empty request body...');
  }
});

app.get('/', (req, res) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server listening on port...', port);
  }
});
