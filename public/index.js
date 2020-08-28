const $loginInfo = document.getElementById('login-info');

fetch('/auth/session').then(response => response.json()).then(data => {
  $loginInfo.innerHTML = `<a href="/channel/create" class="create-channel">채널 생성</a><div class="user">${data}</div><form action="/auth/logout" method="post"><input type="submit" value="로그아웃"></form>`;
}).catch(e => {
  $loginInfo.innerHTML = `<a href="auth/login">로그인/회원가입</a>`
})

const $recommandContainer = document.getElementById('recommand-channel');

fetch('/channel/recommand-list').then(response => response.json()).then(data => {
  if(Array.isArray(data)) {
    $recommandContainer.innerHTML = data.reduce((htmlString, channel) => `${htmlString}
      <a href="/channel/join/${channel.id}">
        <div>
          <h3>${channel.title}</h3>
        
        </div>
      </a>
    `, '')
  }
})

const $searchButton = document.getElementById('search-submit');
const $searchInput = document.getElementById('search-input');
const $searchContainer = document.getElementById('search-channel')

$searchButton.addEventListener('click', () => {
  fetch(`/channel/search/${$searchInput.value}`).then(response => response.json()).then(data => {
    if(Array.isArray(data)) {
      $searchContainer.innerHTML = data.reduce((htmlString, channel) => `${htmlString}
        <a href="/channel/join/${channel.id}">
          <div>
            <h3>${channel.title}</h3>
          
          </div>
        </a>
      `, '')
    }
  })
})