const path = require('path');

// serve this html document created by bundle
module.exports = (app) =>
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
    console.log('send from where', path.join(__dirname, '../../client/dist/index.html'))
  });