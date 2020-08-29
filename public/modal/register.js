const $registerModal = document.getElementById('register-modal');

closeRegisterModal();

function showRegisterModal() {
  $registerModal.style.display = 'flex';
}
function closeRegisterModal() {
  $registerModal.style.display = 'none'
}
$registerModal.addEventListener('click', e => {
  if(e.target.id === 'register-modal') {
    closeRegisterModal();
  }
});
