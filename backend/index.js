const startServer = require('./src/server');
const {port} = require('./config');

console.log(port);
startServer(port);
