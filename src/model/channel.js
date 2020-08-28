const {v4:uuidV4} = require('uuid');

class Channel {
  constructor({title, category, user}){
    this.id = uuidV4();
    this.title = title;
    this.category = category;
    this.thumbnail = `/thumbnail/${user.name}`;
    this.host = user;
    this.viewers = [];
  }
  
  join(user) {

  }
}

module.exports = Channel;