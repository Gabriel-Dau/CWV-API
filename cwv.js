const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = 'cwv.txt';
const PORT = 3000;

const writeToFile = data =>
  fs.writeFile(path, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error(err);
      throw err;
    }
  });

const addCwvDataToFile = dataToAdd => {
  fs.readFile(path, (err, data) => {
    if (err && err.code === 'ENOENT') {
      writeToFile({ 0: dataToAdd });
    } else if (err) {
      console.error(err);
      throw err;
    } else {
      try {
        const parsedData = JSON.parse(data);
        const keys = Object.keys(parsedData);
        writeToFile({ ...parsedData, [keys.length]: { ...dataToAdd, id: keys.length } });
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  });
};

const app = express();

app.use(cors());

app.post('/', bodyParser.json(), (req, res) => {
  if (req.body) {
    addCwvDataToFile(req.body);
  }
  res.send('POST Request Called');
});

app.get('/', (req, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
     console.error(err);
     throw err;
   } else {
     try {
       res.send(data);
     } catch (error) {
       console.error(error);
       throw error;
     }
   }
 });
})

app.listen(PORT, err => {
  if (err) console.log(err);
  console.log('Server listening on PORT', PORT);
});
