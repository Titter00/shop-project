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
  const numData = state.page.data;
  console.log(numPages);

  if (numData === 1 && numPages > 1) {
    return `
    <div class="pagination__container">
    <p class="pagination__text">Pagination</p>
  <button class="pagination__button"><span>${numData + 1}</span></button>
  
</div>`;
  }

  if (numData === numPages && numPages > 1) {
    return `
    <div class="pagination__container">
   <p class="pagination__text">Pagination</p>
 
 <button class="pagination__button"><span>${numData - 1}</span></button>
</div>`;
  }

  if (numData < numPages) {
    return `
    <div class="pagination__container">
    <p class="pagination__text">Pagination</p>
  <button class="pagination__button"><span>${numData - 1}</span></button>
  <button class="pagination__button"><span>${numData + 1}</span></button>
</div>
`;
  }

  return "";
};

// pagination.addEventListener("click", (e) => {
//   const btn = e.target.closest(".pagination__button");
// });
