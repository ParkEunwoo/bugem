const $loginInfo = document.getElementById('login-info');

fetch('/auth/session').then(response => response.json()).then(data => {
  $loginInfo.innerHTML = `<a href="/channel/create" class="create-channel"><i class="material-icons">video_call</i></a><div class="user">${data}</div><form action="/auth/logout" method="post"><input type="submit" value="로그아웃" class="logout"></form>`;
}).catch(e => {
  $loginInfo.innerHTML = `<a href="auth/login" class="login">로그인</a>`
})

function channelHtml(channel) {
  return `<a href="/channel/join/${channel.id}" class="channel-wrapper">
  <div class="channel">
    <h3 class="channel-title">${channel.title}</h3>
    <img class="channel-thumbnail" alt="thumbnail" src="${channel.thumbnail}">
    <div class="channel-info">
      <h4>${channel.category}</h4>
      <h4>시청자 수 ${Object.keys(channel.viewerList).length}</h4>
    </div>
  </div>
</a>`
}

function getChannelList($target, url) {
  fetch(url).then(response => response.json()).then(data => {
    if(Array.isArray(data)) {
      $target.innerHTML = data.reduce((htmlString, channel) => `${htmlString}${channelHtml(channel)}`, '')
    }
  })
}

const $recommandContainer = document.getElementById('recommand-channel');
getChannelList($recommandContainer, '/channel/recommand-list')

const $categoryContainer = document.getElementById('category-channel');
const CATEGORY_LIST = ["hiphop"]
getChannelList($recommandContainer, '/channel/category/hiphop')

const $searchButton = document.getElementById('search-submit');
const $searchInput = document.getElementById('search-input');
const $searchContainer = document.getElementById('search-channel')

window.addEventListener('keypress', e => {
  if(e.key === 'Enter') {
    getChannelList($searchContainer, `/channel/search/${$searchInput.value}`);
  }
})
$searchButton.addEventListener('click', () => {
  getChannelList($searchContainer, `/channel/search/${$searchInput.value}`);
})