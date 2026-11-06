const select = document.querySelector("#page-nav");
select?.addEventListener("change", () => {
  location.href = select.value;
});
const input = document.querySelector("#endpoint-search");
input?.addEventListener("input", () => {
  const q = input.value.toLowerCase().trim();
  let count = 0;
  for (const item of document.querySelectorAll(".endpoint")) {
    const show = item.textContent.toLowerCase().includes(q);
    item.hidden = !show;
    if (show) count++;
  }
  document.querySelector("#search-count").textContent = count + (count === 1 ? " operation" : " operations");
});
