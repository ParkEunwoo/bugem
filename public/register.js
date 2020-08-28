const validation = {
  id: false,
  name: false,
  password: false
}
const $idContainer = document.getElementById('id-container');
const $idInput = document.getElementById('id-input');
const $idCheck = document.getElementById('id-check');
$idInput.addEventListener('input', () => {
  if($idInput.value === '') {
    return;
  }
  fetch(`/auth/check/userid/${$idInput.value}`).then(response => response.json()).then(isDouble => {
    if(isDouble) {
      $idCheck.innerHTML = '중복된 아이디 입니다.'
      validation.id = false;
      $idContainer.classList.remove('validated')
    } else {
      $idCheck.innerHTML = '사용가능한 아이디 입니다.'
      validation.id = true;
      $idContainer.classList.add('validated')
    }
  })
})

const $nameContainer = document.getElementById('name-container');
const $nameInput = document.getElementById('name-input');
const $nameCheck = document.getElementById('name-check');
$nameInput.addEventListener('input', () => {
  if($nameInput.value === '') {
    return;
  }
  fetch(`/auth/check/name/${$nameInput.value}`).then(response => response.json()).then(isDouble => {
    if(isDouble) {
      $nameCheck.innerHTML = '중복된 닉네임 입니다.'
      validation.name = false;
      $nameContainer.classList.remove('validated')
    } else {
      $nameCheck.innerHTML = '사용가능한 닉네임 입니다.'
      validation.name = true;
      $nameContainer.classList.add('validated')
    }
  })
})

const $passwordContainer = document.getElementById('password-container')
const $repasswordContainer = document.getElementById('password-check-container');
const $passwordInput = document.getElementById('password-input');
const $repasswordInput = document.getElementById('repassword-input');
const $passwordCheck = document.getElementById('password-check');
$repasswordInput.addEventListener('input', () => {
  if($passwordInput.value === $repasswordInput.value) {
    $passwordCheck.innerHTML = ''
    validation.password = true;
    $passwordContainer.classList.remove('validated');
    $repasswordContainer.classList.remove('validated');
  } else {
    $passwordCheck.innerHTML = '비밀번호를 확인해주세요';
    validation.password = false;
    $passwordContainer.classList.add('validated');
    $repasswordContainer.classList.add('validated');
  }
})

const $registerForm = document.getElementById('register-form');
$registerForm.addEventListener('submit', (e) => {
  if(isValidate()) {
  } else {
    e.preventDefault();
  }
})

function isValidate() {
  return Object.values(validation).every(v=>v)
}