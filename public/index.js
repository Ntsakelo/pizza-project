document.addEventListener("DOMContentLoaded", function () {
  const smallScreenMenu = document.querySelector(".smallScreenMenu");
  const navBtn = document.querySelector(".navBtn");
  const closeBtn = document.querySelector(".closeBtn");
  const userPage = document.querySelector(".user");
  const loginSection = document.querySelector(".login");
  const registerSection = document.querySelector(".register");
  const showRegister = document.querySelector(".goToRegister");
  const showLogin = document.querySelector(".goToLogin");
  const navLinks = document.querySelectorAll(".navLink");
  const userBtn = document.querySelectorAll(".profile");

  navBtn.addEventListener("click", function () {
    if (userPage.classList.contains("show")) {
      userPage.classList.remove("show");
      userPage.classList.add("hide");
    }
    smallScreenMenu.classList.remove("hideMenu");
    smallScreenMenu.classList.add("showMenu");
    navBtn.setAttribute("style", "display:none");
    closeBtn.setAttribute("style", "display:block");
  });

  closeBtn.addEventListener("click", function () {
    if (userPage.classList.contains("show")) {
      userPage.classList.remove("show");
      userPage.classList.add("hide");
    }
    smallScreenMenu.classList.remove("showMenu");
    smallScreenMenu.classList.add("hideMenu");
    navBtn.setAttribute("style", "display:block");
    closeBtn.setAttribute("style", "display:none");
  });
  showRegister.addEventListener("click", function () {
    loginSection.classList.remove("show");
    loginSection.classList.add("hide");
    registerSection.classList.remove("hide");
    registerSection.classList.add("show");
  });

  showLogin.addEventListener("click", function () {
    loginSection.classList.remove("hide");
    loginSection.classList.add("show");
    registerSection.classList.remove("show");
    registerSection.classList.add("hide");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (userPage.classList.contains("show")) {
        userPage.classList.remove("show");
        userPage.classList.add("hide");
      }
    });
  });
  userBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (smallScreenMenu.classList.contains("showMenu")) {
        smallScreenMenu.classList.remove("showMenu");
        smallScreenMenu.classList.add("hideMenu");
        navBtn.setAttribute("style", "display:block");
        closeBtn.setAttribute("style", "display:none");
      }
      userPage.classList.remove("hide");
      userPage.classList.add("show");
    });
  });
  //server side
  const menuTemplate = document.querySelector(".menuTemplate");
  const pizzaList = document.querySelector(".pizzaList");

  function displayPizzas() {
    axios.get("/api/menu").then((results) => {
      let response = results.data;
      let data = response.data;
      const template = Handlebars.compile(menuTemplate.innerHTML);
      pizzaList.innerHTML = template({
        item: data,
      });
      const pizzaPrices = document.querySelectorAll(".price");
      pizzaPrices.forEach((price) => {
        if (price.classList.contains("smallPrice")) {
          price.classList.add("currentPrice");
        }
      });
      myMenuDetails(pizzaPrices);
    });
  }
  function myMenuDetails(pizzaPrices) {
    let selectedPrice = "";
    let productId = "";
    let qty = 1;
    const addButtons = document.querySelectorAll(".addToBasketBtn");
    pizzaPrices.forEach((price) => {
      price.addEventListener("click", function () {
        selectedPrice = price.id;
      });
    });
    addButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        productId = btn.id;
        axios.post('/api/addToCatalogue',{productId,selectedPrice,qty}).then(results=>{
          alert('added to basket')
        })
      });
    });
  }

  displayPizzas();
});
