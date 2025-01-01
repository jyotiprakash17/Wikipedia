const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';
const formDOM = document.querySelector('.form');
const inputDOM = document.querySelector('.form-input');
const resultsDOM = document.querySelector('.results');

formDOM.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchValue = inputDOM.value.trim();
  if (!searchValue) {
    resultsDOM.innerHTML = '<div class="error">Please enter a valid search term.</div>';
    return;
  }
  fetchPages(searchValue);
});

const fetchPages = async (searchValue) => {
  resultsDOM.innerHTML = '<div class="loading"></div>';
  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const results = data.query.search;
    if (results.length < 1) {
      resultsDOM.innerHTML = '<div class="error">No matching results found. Please try again.</div>';
      return;
    }
    renderResults(results);
  } catch (error) {
    resultsDOM.innerHTML = '<div class="error">There was an error fetching the data...</div>';
  }
};

const renderResults = (list) => {
  const cardsList = list.map((item) => {
    const { title, snippet, pageid } = item;
    return `
      <a href="https://en.wikipedia.org/?curid=${pageid}" target="_blank">
        <h4>${title}</h4>
        <p>${snippet}</p>
      </a>
    `;
  }).join('');
  resultsDOM.innerHTML = `<div class="articles">${cardsList}</div>`;
};
