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