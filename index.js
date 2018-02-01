const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
let nextPageToken = '';
let searchTerm = '';

function getDataFromApi(callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyCH36HRS0a8HPRC4BcsuMSzHDlnx_drcbs',
    q: `${searchTerm}`
  }
  if (nextPageToken) {
    query.pageToken = nextPageToken;
  }
  console.log(query);
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  console.log('renderResult ran')
  return `
    <div class='each-result'>
      <h2 class='snippet-title'>${result.snippet.title}</h2>
      <a href='https://www.youtube.com/watch?v=${result.id.videoId}'><img src='${result.snippet.thumbnails.medium.url}' class='thumbnail' alt='Thumbnail showing a preview of the video'/></a>  
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  nextPageToken = data.nextPageToken;
  console.log('displayYouTubeSearchData ran');
  const results = data.items.map((item, index) => renderResult(item));
  $('.search-results').html(results);
  renderNextResultsButton();
  handleNextResultsClick();
}

function renderNextResultsButton() {
  console.log('renderNextResultsButton ran');
  $('.search-results').append(`
      <input type='submit' value='Next 5 results' class='button next-results' />
    `);
}


function handleNextResultsClick() {
  console.log('handleNextResultsClick ran');
  $('main').on('click', '.next-results', event => {
    event.preventDefault();
    getDataFromApi(displayYouTubeSearchData);
  });
}

function watchSubmit() {
  console.log('watchSubmit ran')
  $('.search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.search-input');
    searchTerm = queryTarget.val();
    queryTarget.val('');
    getDataFromApi(displayYouTubeSearchData);
  });
}

$(watchSubmit);
