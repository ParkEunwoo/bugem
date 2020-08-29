const socketIO = require('socket.io');
const {getChannel, removeChannel} = require('./model/channelList');

module.exports = {
  connectSocket: (server) => {
    const io = socketIO(server);

    io.on("connection", (socket) => {
      socket.on("join-room", (roomId, userId, name) => {
        const channel = getChannel(roomId);
        if(!channel) {
          return;
        }
        socket.join(roomId);
        channel.join(name)
        
        socket.to(roomId).broadcast.emit("user-connected", userId);
    
        socket.on('chat-message', (name, message) => {
          socket.to(roomId).broadcast.emit('chat-message', name, message);
        })

        socket.on("disconnect", () => {
          if(channel.leave(name)) {
            removeChannel(channel);
            socket.to(roomId).broadcast.emit("close-room");
          }
          socket.to(roomId).broadcast.emit("user-disconnected", userId);
        });
      });
    });
  }
}
