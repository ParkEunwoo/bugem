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

const $recommandContainer = document.getElementById('recommand-channel');

fetch('/channel/recommand-list').then(response => response.json()).then(data => {
  if(Array.isArray(data)) {
    $recommandContainer.innerHTML = data.reduce((htmlString, channel) => `${htmlString}${channelHtml(channel)}`, '')
  }
})

const $searchButton = document.getElementById('search-submit');
const $searchInput = document.getElementById('search-input');
const $searchContainer = document.getElementById('search-channel')

$searchButton.addEventListener('click', () => {
  fetch(`/channel/search/${$searchInput.value}`).then(response => response.json()).then(data => {
    if(Array.isArray(data)) {
      $searchContainer.innerHTML = data.reduce((htmlString, channel) => `${htmlString}${channelHtml(channel)}`, '')
    }
  })
})