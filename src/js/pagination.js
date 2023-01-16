export const state = {
  resultsPerPage: 6,
  page: 1,
};

export const getSearchResultPage = (data, page = state.page) => {
  state.page = page;

  const start = (page - 1) * state.resultsPerPage;
  const end = page * state.resultsPerPage;
  return data.slice(start, end);
};

export const generateMarkup = (data) => {
  const numPages = Math.ceil(data.length / state.resultsPerPage);
  console.log(numPages);

  if (data.page === 1 && numPages > 1) {
    console.log("page1, other");
  }
};
