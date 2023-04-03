import { data } from "./data";
export const basketClearBtn = document.querySelector(".header__list-clear");
export const basketAmount = document.querySelector(".header__list-amount");
let basket = [];

export const addToBasket = (e) => {
  const productId = parseInt(e.target.dataset.id);

  const key = data.findIndex((product) => product.id === productId);

  basket.push(data.at(key)).toFixed(2);

  const totalPrice = basket
    .reduce((sum, product) => {
      return (sum += product.price);
    }, 0)
    .toFixed(2);

  totalPrice > 0 ? basketClearBtn.classList.add("active") : "";

  basketAmount.innerHTML = `${totalPrice} zł`;
};
export const clearBtn = () => {
  if (basketAmount) {
    basketAmount.innerHTML = "Koszyk";
    basketClearBtn.classList.remove("active");
  }
  basket = [];
};
