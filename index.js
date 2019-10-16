const express = require('express');

const server = express();

server.get('/',(req, res) => {
  return res.send('Hello Omnistack')
})

server.listen(3000);