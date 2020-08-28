class Channel {
  constructor({title, category, thumbnail}, user){
    this.#title = title;
    this.#category = category;
    this.#thumbnail = thumbnail;
    this.#host = user;
  }

  set roomName (roomName) {
    this.#roomName = roomName;
  }
  get roomName () {
    return this.#roomName;
  }

  get viewers (io) {
    return io.sockets.clients(this.roomName).length - 1;
  }
  
}

module.exports = Channel;