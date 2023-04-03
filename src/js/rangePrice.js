import { displayItems } from "./script";

export const rangePrice = (data, productContainer) => {
  const priceRange = document.querySelector(".price__range");
  const priceValue = document.querySelector(".price__value");
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

    displayItems(
      data.filter((item) => item.price <= e.target.value),
      1
    );
  });
};
