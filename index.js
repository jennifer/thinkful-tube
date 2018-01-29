const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    //pageToken: `${nextPageToken}`,
    part: 'snippet',
    key: 'AIzaSyCH36HRS0a8HPRC4BcsuMSzHDlnx_drcbs',
    q: `${searchTerm}`
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  console.log('renderResult ran')
  return `
    <div>
      <h2 class='snippet-title'>${result.snippet.title}</h2>
      <a href='https://www.youtube.com/watch?v=${result.id.videoId}'><img src='${result.snippet.thumbnails.medium.url}' class='thumbnail' alt='Thumbnail showing a preview of the video'/></a>  
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  console.log('displayYouTubeSearchData ran');
  const results = data.items.map((item, index) => renderResult(item));
  $('.search-results').html(results);
  //renderNextResultsButton();
}

//Attempts at adding Next 5 Resutls button. How to call the nextPageToken from here?
/*
function renderNextResultsButton() {
  console.log('renderNextResultsButton ran');
  $('.search-results').append(`
      <form action="${YOUTUBE_SEARCH_URL}'?pageToken='${result.nextPageToken}'&q='${q}'&part='${part}'&key='${key}">
        <input type='submit' value='Next 5 results' />
      </form>
    `);
}

function handleNextResultsClick() {
  console.log('handleNextResultsClick ran');
  $('main').on('click', '.next-results', event => {
    event.preventDefault();
    getNextPageDataFromApi(query, displayYouTubeSearchData);
  });
}

function getNextPageDataFromApi(searchTerm, callback) {
  console.log('getNextPageDataFromApi ran');
  const query = {
    pageToken: `${nextPageToken}`,
    part: 'snippet',
    key: 'AIzaSyCH36HRS0a8HPRC4BcsuMSzHDlnx_drcbs',
    q: `${searchTerm}`
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}
*/
function watchSubmit() {
  console.log('watchSubmit ran')
  $('.search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.search-input');
    const query = queryTarget.val();
    queryTarget.val('');
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
