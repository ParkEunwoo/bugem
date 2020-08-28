const Channel = require('./channel');
const channelList = [];

function createChannel({title, category, user}) {
  const channel = new Channel({title, category, user});
  channelList.push(channel);

  return channel.id;
}

module.exports = {
  createChannel,
}