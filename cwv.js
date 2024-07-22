const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = 'cwv.txt';
const PORT = 3000;
const data = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path).toString()) : {};

const addData = dataToAdd => {
  const keys = Object.keys(data);
  const id = keys.length;
  data[id] = { ...dataToAdd, id };
  fs.writeFileSync(path, JSON.stringify(data, null, 2), err => err && console.error(err));
};

const app = express();

app.use(cors());
app.post('/', bodyParser.json(), (req, res) => {
  if (req.body) {
    addData(req.body);
    console.log(req.body);
    res.send('data added.');
  } else {
    console.log('empty request body received.')
    res.send('empty request body received.');
  }
});
app.get('/', (req, res) => res.send(data));
app.listen(PORT, err => err ? console.log(err) : console.log('Server listening on PORT', PORT));
