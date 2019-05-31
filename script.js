'use strict'

// input your own key below for the value of 'apiKey'
const apiKey = '';
const searchURL = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}

function displayResults(parks) {
  $('#display_items').empty();

  const parksByState = [];

  parks.data.map(function(park) {
    parksByState.push(
      `<li>
        <h3>${park.name}</h3>
        <p>${park.description}</p>
        <a href="${park.url}">${park.name} Website</a>
      </li>`
    )
  })

  $('#display_items').append(parksByState);

  $('#results').removeClass('hidden');
}

function getParks(state, maxResults) {
  const params = {
    api_key: apiKey,
    limit: maxResults, 
    stateCode: state 
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(parks => displayResults(parks))
    .catch(err => {
      $('#error_message').text(`Something went wrong: ${err.message}`);
    });
}

function handleSearch() {
  $('#search_form').submit(event => {
    event.preventDefault();
    const state = $('#search_state').val();
    const maxResults = $('#max_results').val() -1;
    getParks(state, maxResults);
  });
}

$(handleSearch);