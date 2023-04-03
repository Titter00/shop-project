import { displayItems } from "./script";

let currentPage = 1;
const itemsPerPage = 6;
const header = document.querySelector(".header");
const headerHeight = header.getBoundingClientRect().height;

export const paginateData = (items, page, perPage) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return items.slice(start, end);
};

export const renderPaginationButtons = (totalItems, data) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationContainer = document.querySelector(".pagination");

  let buttonsHtml = "";
  if (currentPage > 1) {
    buttonsHtml += `<button class="pagination__button pagination__button--prev" data-page="${
      currentPage - 1
    }"><i class="fas fa-chevron-left"></i></button>`;
  }
  if (currentPage < totalPages) {
    buttonsHtml += `<button class="pagination__button pagination__button--next" data-page="${
      currentPage + 1
    }"><i class="fas fa-chevron-right"></i></button>`;
  }

  paginationContainer.innerHTML = buttonsHtml;

  const prevButton = document.querySelector(".pagination__button--prev");
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      currentPage -= 1;
      displayItems(data);
      window.scrollTo({
        top: headerHeight,
        behavior: "smooth",
      });
    });
  }

  const nextButton = document.querySelector(".pagination__button--next");
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      currentPage += 1;
      displayItems(data);
      window.scrollTo({
        top: headerHeight,
        behavior: "smooth",
      });
    });
  }
};
