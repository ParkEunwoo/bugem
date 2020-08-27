const socket = io("/");
socket.emit("join-room", 32, 2);