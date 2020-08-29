const $loginModal = document.getElementById('login-modal');
closeLoginModal();

$loginModal.addEventListener('click', e => {
  if(e.target.id === 'login-modal') {
    closeLoginModal();
  }
});

function showLoginModal() {
  $loginModal.style.display = 'flex';
}
function closeLoginModal() {
  $loginModal.style.display = 'none';
}