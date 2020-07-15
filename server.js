const express = require('express');

const app = express();
const port = 5000;

app.listen(5000, () => { console.log(`server is running on port ${port}`) });

app.get('/api', (req, res) => {
  res.console.log('You did it!');
})