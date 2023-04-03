const header = document.querySelector(".header");
const headerHeight = header.getBoundingClientRect().height;

export const stickyHeader = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting) header.classList.add("sticky");
};

export const headerObserver = new IntersectionObserver(stickyHeader, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});
headerObserver.observe(header);
