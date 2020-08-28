const $idInput = document.getElementById('id-input');
const $idCheck = document.getElementById('id-check');
$idInput.addEventListener('input', () => {
  if($idInput.value === '') {
    return;
  }
  fetch(`/auth/check/userid/${$idInput.value}`).then(response => response.json()).then(isDouble => {
    if(isDouble) {
      $idCheck.innerHTML = '중복된 아이디 입니다.'
    } else {
      $idCheck.innerHTML = '사용가능한 아이디 입니다.'
    }
  })
})

