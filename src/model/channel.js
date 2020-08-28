const {v4:uuidV4} = require('uuid');

class Channel {
  constructor({title, category, user}){
    this.id = uuidV4();
    this.title = title;
    this.category = category;
    this.thumbnail = `/thumbnail/${user.name}`;
    this.host = user;
    this.viewerList = [];
  }
  
  join(user) {
    if(this.host.name === user) {
      return;
    }
    this.viewerList.push(user)
  }

  get viewers () {
    return this.viewerList.length;
  }
}

module.exports = Channel;