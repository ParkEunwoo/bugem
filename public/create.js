function readURL(input) {
  if (input.files && input.files[0]) {
   const reader = new FileReader();
   
  reader.onload = function (e) {
    $preview.setAttribute('src', e.target.result);  
  }
  
  reader.readAsDataURL(input.files[0]);
  }
}

const $imageInput = document.getElementById('thumbnail-input');
const $preview = document.getElementById('thumbnail-preview');

const $inputButton = document.getElementById('input-button');
$inputButton.addEventListener('click', (e) => {
  e.preventDefault();
  $imageInput.click();
})

$imageInput.addEventListener('change', (e) => {
readURL(e.target)
})