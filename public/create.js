function readURL(input) {
  if (input.files && input.files[0]) {
   var reader = new FileReader();
   
   reader.onload = function (e) {
    $preview.setAttribute('src', e.target.result);  
   }
   
   reader.readAsDataURL(input.files[0]);
   }
 }
 
  const $imageInput = document.getElementById('thumbnail-input');
  const $preview = document.getElementById('thumbnail-preview');

  $imageInput.addEventListener('change', (e) => {
  readURL(e.target)
  })