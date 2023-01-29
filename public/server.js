document.addEventListener("DOMContentLoaded", function () {
  //dom elements
  const menuTemplate = document.querySelector(".menuTemplate");
  const pizzaList = document.querySelector(".pizzaList");
  //--dom elements end

  function displayPizzas() {
    axios.get("/api/menu").then((results) => {
      let response = results.data;
      let data = response.data;
      const template = Handlebars.compile(menuTemplate.innerHTML);
      pizzaList.innerHTML = template({
        item: data,
      });
    });
  }
  displayPizzas();
});
