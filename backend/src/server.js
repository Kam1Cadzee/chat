const http = require('http');
const bodyParser = require('body-parser');
const app = require('./modules/app');
const morgan = require('morgan');

const errorHandler = (err, req, res, next) => {
  console.log(err.stack);

  res.json(404).send('No such page');
};

const startServer = port => {
  const server = http.createServer(app);

  app
      .use(bodyParser.urlencoded({extended: false}))
      .use(bodyParser.json())
      .use(morgan('dev'))
      .use('/', (req, res) => res.send('OKAY'))
      .use(errorHandler);

  server.listen(port);
console.log(port);
  console.log('Server was started at http://localhost:' + port);
};

module.exports = startServer;
