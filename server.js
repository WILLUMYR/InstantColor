const express = require('express');
const fetch = require("node-fetch");
const request = require('request');

const app = express();
const port = 5000;

app.listen(5000, () => { console.log(`server is running on port ${port}`) });

app.get('/api/color/:hex/:mode', (req, res) => {
  const hex = req.params.hex;
  const mode = req.params.mode;
  request(
    `http://thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=5`,
    (error, response, body) => {
      if (!error && response.statusCode === 200) {

        res.send(body);
      }
    }
  )
})