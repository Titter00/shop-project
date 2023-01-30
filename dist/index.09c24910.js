const data = [
    {
        id: 1,
        name: "Laptop Gigabyte G5 KD-52EE123SD ",
        img: "gigabyte.jpg",
        price: 3999,
        cat: "Computers"
    },
    {
        id: 2,
        name: "Next Level Racing Kokpit GTTrack (NLR-S009)",
        img: "gaming.jpg",
        price: 2649,
        cat: "Gaming"
    },
    {
        id: 3,
        name: "Reolink RLC-811A 8Mpix bullet ",
        img: "monitoring.jpg",
        price: 700,
        cat: "Home"
    },
    {
        id: 4,
        name: "Kamera GoPro Hero 10 czarna",
        img: "gopro.jpg",
        price: 2051.99,
        cat: "Foto and Camera"
    },
    {
        id: 5,
        name: "Telewizor Samsung QE75Q80BAT QLED 75'' 4K Ultra HD Tizen ",
        img: "tv.jpg",
        price: 6399.99,
        cat: "TV"
    },
    {
        id: 6,
        name: "Klawiatura SteelSeries Apex 3 TKL ",
        img: "klawka.jpg",
        price: 217,
        cat: "Gaming"
    }
];
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
const stickyHeader = (entires)=>{
    const [entry] = entires;
    if (!entry.isIntersecting) header.classList.add("sticky");
};
const headerObserver = new IntersectionObserver(stickyHeader, {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight}px`
});
headerObserver.observe(header);
const addToBasket = (e)=>{
    const productId = parseInt(e.target.dataset.id);
    console.log(productId);
    const key = data.findIndex((product)=>product.id == productId);
    console.log(key);
    basket.push(data.at(key)).toFixed(2);
    const totalPrice = basket.reduce((sum, product)=>{
        return sum += product.price;
    }, 0).toFixed(2);
    totalPrice > 0 ? basketClearBtn.classList.add("active") : basketClearBtn.classList.remove("active");
    basketAmount.innerHTML = `${totalPrice} zł`;
};
const displayItems = (items)=>{
    items.forEach((item)=>{
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
    addToBasketButtons.forEach((button)=>button.addEventListener("click", addToBasket));
};
displayItems(data);
const renderCateogires = ()=>{
    const allCategories = data.map((item)=>item.cat);
    const categories = [
        "Wszystkie",
        ...allCategories.filter((item, i)=>{
            return allCategories.indexOf(item) === i;
        })
    ];
    categories.forEach((cat)=>{
        const html = `
    <button>${cat}</button>`;
        categoriesContainer.insertAdjacentHTML("beforeend", html);
    });
};
renderCateogires();
const rangePrice = ()=>{
    const priceList = data.map((item)=>item.price);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);
    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = maxPrice + "zł";
    priceRange.addEventListener("input", (e)=>{
        productContainer.innerHTML = "";
        priceValue.textContent = e.target.value + "zł";
        displayItems(data.filter((item)=>item.price <= e.target.value));
    });
};
rangePrice();
const clearBtn = ()=>{
    basketAmount.innerHTML = "Koszyk";
    basket = [];
};
basketClearBtn.addEventListener("click", clearBtn);
searchInput.addEventListener("keyup", (e)=>{
    productContainer.innerHTML = "";
    const value = e.target.value.toLowerCase();
    value ? displayItems(data.filter((item)=>item.name.toLowerCase().indexOf(value) !== -1)) : displayItems(data);
});
categoriesContainer.addEventListener("click", (e)=>{
    productContainer.innerHTML = "";
    const selectedCategory = e.target.textContent;
    selectedCategory === "Wszystkie" ? displayItems(data) : displayItems(data.filter((item)=>item.cat === selectedCategory));
});

//# sourceMappingURL=index.09c24910.js.map
