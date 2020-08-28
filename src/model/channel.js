const {v4:uuidV4} = require('uuid');

class Channel {
  constructor({title, category, user}){
    this.id = uuidV4();
    this.title = title;
    this.category = category;
    this.thumbnail = `/thumbnail/${user.name}.png`;
    this.host = user;
    this.viewerList = {};
  }
  
  join(user) {
    if(this.host.name === user) {
      return;
    }
    this.viewerList[user] = true;
  }
  leave(user) {
    if(this.host.name === user) {
      return true;
    }
    delete this.viewerList[user];
    return false;
  }

  get viewers () {
    return Object.keys(this.viewerList).length;
  }
}

module.exports = Channel;