const {createServer} = require('./src/server.js');
const {connectSocket} = require('./src/socket.js');
console.log(createServer)
const server = createServer();
connectSocket(server);
