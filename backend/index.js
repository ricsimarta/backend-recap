const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.use('/public', express.static(path.join(`${__dirname}/../frontend/static`)));

app.get('/api/users', (req, res) => {
  res.sendFile(path.join(`${__dirname}/data.json`));
});

app.post('/api/users', (req, res) => {
  console.log(req.body);

  fs.readFile(`${__dirname}/data.json`, (err, rawData) => {
    const currentData = JSON.parse(rawData);
    const newData = {
      id: currentData[currentData.length - 1].id + 1,
      ...req.body
    };

    currentData.push(newData);

    fs.writeFile(`${__dirname}/data.json`, JSON.stringify(currentData, null, 2), () => {
      res.json(`new data has been added with id ${newData.id}`);
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});