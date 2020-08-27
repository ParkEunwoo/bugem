const {createServer} = require('./src/server.js');
const {connectSocket} = require('./src/socket.js');

const server = createServer();
connectSocket(server);
