const ROOM_ID = location.pathname.split('/').pop();
const socket = io("/");
let name;

const myPeer = new Peer(undefined, {
  host: "/",
  port: "3001",
});
const peers = {};

const myVideo = document.createElement("video");
myVideo.muted = true;

myPeer.on("open", (id) => {
  fetch('/auth/session').then(response => response.json()).then(data => {
    name = data;
  }).then(() => {
    socket.emit("join-room", ROOM_ID, id, name);
  })
});

const $messageList = document.getElementById('message-list');
const $sendMessage = document.getElementById('send-message');
const $sendButton = document.getElementById('send-button');

$sendMessage.addEventListener('input', () => {
  if($sendMessage.value === '') {
    $sendButton.disabled = true;
  } else {
    $sendButton.disabled = false;
  }
})
window.addEventListener('keypress', e => {
  if(e.key === 'Enter') {
    socket.emit('chat-message', name, $sendMessage.value)
    appendMessage(name, $sendMessage.value)
    $sendMessage.value = '';
  }
})
$sendButton.addEventListener('click', () => {
  socket.emit('chat-message', name, $sendMessage.value)
  appendMessage(name, $sendMessage.value)
  $sendMessage.value = '';
})

socket.on('chat-message', (name, message) => {
  appendMessage(name, message)
})

function appendMessage(name, message) {
  const $message = document.createElement('li');
  $message.textContent = message;
  $messageList.appendChild($message);
}

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
socket.on('close-room', () => {
  alert('종료된 채널')
})

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

const $channelContainer = document.getElementById("channel-container");
fetch(`/channel/info/${ROOM_ID}`).then(response => response.json()).then(channel => {
  $channelContainer.innerHTML = `
    <h2 class="title">${channel.title}</h2>
    <img class="thumbnail" src="${channel.thumbnail}" alt="thumbnail">
    <h4 class="category">${channel.category}</h4>
    <h4 class="viewers">${Object.keys(channel.viewerList).length}</h4>
    `;
})

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoContainer.append(video);
}
