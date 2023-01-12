export const state = {
  resultsPerPage: 2,
  page: 1,
};
export const getSearchResultPage = (data, page = state.page) => {
  state.page = page;

  const start = (page - 1) * state.resultsPerPage;
  const end = page * state.resultsPerPage;
  return data.slice(start, end);
};
