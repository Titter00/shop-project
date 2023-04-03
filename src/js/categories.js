export const renderCateogires = (data, categoriesContainer) => {
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
