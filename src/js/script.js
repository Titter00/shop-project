const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: "./images/laptop.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 2,
    name: "Invicta Men's Pro Diver 2",
    img: "./images/laptop.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 3,
    name: "Timex Men's Expedition Scout ",
    img: "./images/laptop.jpg",
    price: 40,
    cat: "Sport",
  },
  {
    id: 4,
    name: "Breitling Superocean Heritage",
    img: "./images/laptop.jpg",
    price: 200,
    cat: "Luxury",
  },
  {
    id: 5,
    name: "Casio Classic Resin Strap ",
    img: "./images/laptop.jpg",
    price: 16,
    cat: "Sport",
  },
  {
    id: 6,
    name: "Garmin Venu Smartwatch ",
    img: "./images/R.jpg",
    price: 74,
    cat: "Casual",
  },
];

const productContainer = document.querySelector(".products");
const categoriesContainer = document.querySelector(".categories__items");
const searchInput = document.querySelector(".header__search-input");
const basketAmount = document.querySelector(".header__basket__amount");
const basketClearBtn = document.querySelector(".header__basket-clear");
let addToBasketButtons;
let basket = [];

const addToBasket = (e) => {
  const productId = e.target.dataset.id;

  const key = data.findIndex((product) => productId === product.id);
  console.log(key);
  basket.push(data.at(key));

  const totalPrice = basket.reduce((sum, product) => {
    return (sum += product.price);
  }, 0);

  totalPrice > 0
    ? basketClearBtn.classList.add("active")
    : basketClearBtn.classList.remove("active");

  basketAmount.innerHTML = `${totalPrice} zł`;
};

const displayItems = (items) => {
  items.forEach((item) => {
    const html = `
    <div class="product">
          <img class="product__img" src="${item.img}" alt="Watch image" />
          <span class="product__name">${item.name}</span>
          <span class="product__price">${item.price} zł</span>
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

displayItems(data);

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

renderCateogires();

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
