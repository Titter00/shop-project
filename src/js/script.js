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

const displayItems = (items) => {
  items.forEach((item) => {
    const html = `
    <div class="product">
          <img class="product__img" src="${item.img}" alt="Watch image" />
          <span class="product__name">${item.name}</span>
          <span class="product__price">${item.price} zł</span>
          <div class="product__button">
            <button class="add-to-basket">Dodaj do koszyka</button>
          </div>
        </div>
    `;

    productContainer.insertAdjacentHTML("afterbegin", html);
  });
};

displayItems(data);
