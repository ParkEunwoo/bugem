const $loginInfo = document.getElementById('login-info');

fetch('/auth/session').then(response => response.json()).then(data => {
  $loginInfo.innerHTML = `<a href="/channel/create" class="create-channel"><i class="material-icons">video_call</i></a><div class="user">${data}</div><form action="/auth/logout" method="post"><input type="submit" value="로그아웃" class="logout"></form>`;
}).catch(e => {
  $loginInfo.innerHTML = `<a href="auth/login" class="login">로그인</a>`
})