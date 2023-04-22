import { data } from "./data.js";
import { renderCateogires } from "./categories.js";
import { rangePrice } from "./rangePrice.js";
import { basketClearBtn, basketAmount, addToBasket, clearBtn } from "./addToBasket.js";
import { stickyHeader, headerObserver } from "./intersectionObserver";

const productContainer = document.querySelector(".products");
const categoriesContainer = document.querySelector(".categories__items");
const searchInput = document.querySelector(".header__search-input");

let addToBasketButtons;

const itemsPerPage = 6;
let currentPage = 1;

export const displayItems = (items) => {
  productContainer.innerHTML = "";
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  currentItems.forEach((item) => {
    const html = `
    <div class="product" data-cy="product">
      <img class="product__img" src="${item.img}" alt="Watch image" />
      <span class="product__name">${item.name}</span>
      <span class="product__price" data-cy="product-price">${item.price} zł</span>
      <span class="product__info">Learn more</span>
      <div class="product__button">
        <button data-id="${item.id}" class="add-to-basket" data-cy="add-basket">Dodaj do koszyka</button>
      </div>
    </div>
    `;
    productContainer.insertAdjacentHTML("beforeend", html);
  });
  addToBasketButtons = document.querySelectorAll(".add-to-basket");
  addToBasketButtons.forEach((button) => button.addEventListener("click", addToBasket));

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";

  const previousButton = document.createElement("button");

  previousButton.classList.add("pagination__button");
  previousButton.setAttribute("data-cy", "pagination-button");
  previousButton.disabled = currentPage === 1;
  const img = document.createElement("img");
  img.src = "./arrow-left-solid.svg";
  img.alt = "Previous Page";
  previousButton.appendChild(img);
  previousButton.addEventListener("click", () => {
    currentPage -= 1;
    displayItems(items);
  });
  paginationContainer.appendChild(previousButton);

  const nextButton = document.createElement("button");

  nextButton.classList.add("pagination__button");
  nextButton.setAttribute("data-cy", "pagination-button");
  nextButton.disabled = currentPage === totalPages;
  const img2 = document.createElement("img");
  img2.src = "./arrow-right-solid.svg";
  img2.alt = "Previous Page";
  nextButton.appendChild(img2);
  nextButton.addEventListener("click", () => {
    currentPage += 1;
    displayItems(items);
  });
  paginationContainer.appendChild(nextButton);
};

basketClearBtn.addEventListener("click", clearBtn);

searchInput.addEventListener("keyup", (e) => {
  productContainer.innerHTML = "";
  const value = e.target.value.toLowerCase();

  value
    ? displayItems(data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1))
    : displayItems(data);
});

categoriesContainer.addEventListener("click", (e) => {
  productContainer.innerHTML = "";
  const selectedCategory = e.target.textContent;

  selectedCategory === "Wszystkie"
    ? displayItems(data, 1)
    : displayItems(
        data.filter((item) => item.cat === selectedCategory),
        1
      );
});

const init = () => {
  displayItems(data);

  renderCateogires(data, categoriesContainer);
  rangePrice(data, productContainer);
};
init();
