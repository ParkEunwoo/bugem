const {v4:uuidV4} = require('uuid');

class Channel {
  #title;
  #category;
  #thumbnail;
  #host;
  #roomName;
  constructor({title, category, thumbnail}, user){
    this.id = uuidV4();
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

  get viewers () {
    return 0;
  }
  
}

module.exports = Channel;