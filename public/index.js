const $recommandContainer = document.getElementById('recommand-channel');

fetch('/channel/recommand-list').then(response => response.json()).then(data => {
  if(Array.isArray(data)) {
    $recommandContainer.innerHTML = data.reduce((htmlString, channel) => `${htmlString}
      <div>
        <h3>${channel.title}</h3>
        
      </div>
    `, '')
  }
})