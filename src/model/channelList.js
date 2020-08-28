const Channel = require('./channel');
const channelList = [];

function createChannel({title, category, user}) {
  const channel = new Channel({title, category, user});
  channelList.push(channel);

  return channel.id;
}

function recommandList() {
  const sortedByViewers = channelList.sort((channel1, channel2) => channel1.viewers < channel2.viewers);

  return sortedByViewers;
}

function findChannel(keyword) {
  const findList = channelList.filter()

  return findList;
}

module.exports = {
  createChannel,
  recommandList,
  findChannel,
}