import { data } from "./data.js";
import { state, getSearchResultPage } from "./pagination";

const productContainer = document.querySelector(".products");
const categoriesContainer = document.querySelector(".categories__items");
const searchInput = document.querySelector(".header__search-input");
const basketAmount = document.querySelector(".header__list__amount");
const basketClearBtn = document.querySelector(".header__list-clear");
const priceRange = document.querySelector(".price__range");
const priceValue = document.querySelector(".price__value");
const header = document.querySelector(".header");

let addToBasketButtons;
let basket = [];
const headerHeight = header.getBoundingClientRect().height;
console.log(state, getSearchResultPage(data, 3));
//
const stickyHeader = (entires) => {
  const [entry] = entires;

  if (!entry.isIntersecting) header.classList.add("sticky");
};
//
//
const headerObserver = new IntersectionObserver(stickyHeader, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});
headerObserver.observe(header);
//
//

const addToBasket = (e) => {
  const productId = parseInt(e.target.dataset.id);
  console.log(productId);
  const key = data.findIndex((product) => product.id === productId);
  console.log(key);
  basket.push(data.at(key)).toFixed(2);

  const totalPrice = basket
    .reduce((sum, product) => {
      return (sum += product.price);
    }, 0)
    .toFixed(2);

  totalPrice > 0
    ? basketClearBtn.classList.add("active")
    : basketClearBtn.classList.remove("active");

  basketAmount.innerHTML = `${totalPrice} zł`;
};
//
//

const displayItems = (items) => {
  productContainer.innerHTML = "";
  items.forEach((item) => {
    const html = `
    <div class="product">
          <img class="product__img" src="${item.img}" alt="Watch image" />
          <span class="product__name">${item.name}</span>
          <span class="product__price">${item.price} zł</span>
          <span class="product__info">Learn more</span>
          <div class="product__button">
            <button data-id="${item.id}" class="add-to-basket">Dodaj do koszyka</button>
          </div>
        </div>
    `;

    productContainer.insertAdjacentHTML("beforeend", html);
  });

  addToBasketButtons = document.querySelectorAll(".add-to-basket");
  addToBasketButtons.forEach((button) => button.addEventListener("click", addToBasket));
};
//

//
const renderCateogires = () => {
  const allCategories = data.map((item) => item.cat);

  const categories = [
    "Wszystkie",
    ...allCategories.filter((item, i) => {
      return allCategories.indexOf(item) === i;
    }),
  ];
  categories.forEach((cat) => {
    const html = `
    <button>${cat}</button>`;

    categoriesContainer.insertAdjacentHTML("beforeend", html);
  });
};
//

//
const rangePrice = () => {
  const priceList = data.map((item) => item.price);
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);

  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;
  priceValue.textContent = maxPrice + "zł";

  priceRange.addEventListener("input", (e) => {
    productContainer.innerHTML = "";
    priceValue.textContent = e.target.value + "zł";

    displayItems(data.filter((item) => item.price <= e.target.value));
  });
};
//

const clearBtn = () => {
  basketAmount.innerHTML = "Koszyk";
  basket = [];
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
    ? displayItems(data)
    : displayItems(data.filter((item) => item.cat === selectedCategory));
});

const init = () => {
  displayItems(getSearchResultPage(data, 1));
  renderCateogires();
  rangePrice();
};
init();
