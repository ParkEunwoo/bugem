const ROOM_ID = location.pathname.substring(1);
const socket = io("/");

const myPeer = new Peer(undefined, {
  host: "/",
  port: "3001",
});
const peers = {};

const myVideo = document.createElement("video");
myVideo.muted = true;

myPeer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

const $messageList = document.getElementById('message-list');
const $sendMessage = document.getElementById('send-message');
const $sendButton = document.getElementByIdI('send-button');

$sendButton.addEventListener('click', () => {
  socket.emit('chat-message', $sendMessage.value)
})

socket.on('chat-message', (user, message) => {
  const $message = document.createElement('li');
  $message.textContent = message;
  $messageList.appendChild($message);
})

const isHost = location.hash;
if(isHost) {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      addVideoStream(myVideo, stream);

      socket.on("user-connected", (userId) => {
        connectToNewUser(userId, stream);
      });
    })
    .catch((error) => console.error(error));
}
else {
  myPeer.on("call", (call) => {
    call.answer()
    const userVideo = document.createElement("video");

    call.on("stream", (userVideoStream) => {
      addVideoStream(userVideo, userVideoStream);
    });
  });
}
socket.on("user-disconnected", (userId) => {
  if (peers[userId]) {
    peers[userId].close();
  }
});

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  const userVideo = document.createElement("video");

  call.on("stream", (userVideoStream) => {
    addVideoStream(userVideo, userVideoStream);
  });

  call.on("close", () => {
    userVideo.remove();
  });
  peers[userId] = call;
}

const videoContainer = document.getElementById("video-container");

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoContainer.append(video);
}
