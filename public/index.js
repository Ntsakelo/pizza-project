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
  const catalogueSection = document.querySelector('.catalogueSection');
  const main = document.querySelector('.main');
  const cartBtn = document.querySelector('.shoppingCart');
  const homeLink = document.querySelector('.goHome'); 

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
  homeLink.addEventListener('click',function(){
    catalogueSection.classList.remove('show');
    catalogueSection.classList.add('hide');
    main.classList.remove('hide');
    main.classList.add('show');
  })
  cartBtn.addEventListener('click',function(){
    main.classList.remove('show');
    main.classList.add('hide');
    catalogueSection.classList.remove('hide');
    catalogueSection.classList.add('show');
  })
  //server side
  const menuTemplate = document.querySelector(".menuTemplate");
  const pizzaList = document.querySelector(".pizzaList");
  const catalogueTemplate = document.querySelector('.catalogueTemplate')
  const catalogueList = document.querySelector('.catalogueList');

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
        selectedPrice = Number(price.id);
   
      });
    });
    addButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        productId = btn.id;
        axios.post('/api/addToCatalogue',{productId,selectedPrice,qty}).then(results=>{
         
        })
      });
    });
  }
  function myCart(){
    cartBtn.addEventListener('click',function(){
      axios.get('/api/myCart').then(results=>{
        let response = results.data;
        let data = response.data;
        const template = Handlebars.compile(catalogueTemplate.innerHTML);
        catalogueList.innerHTML = template({
          cartItems: data
        })
        remove();
        updateQty();
      })
    })
  }
  function updateQty(){
    const increaseBtns = document.querySelectorAll('.increaseBtn');
  const decreaseBtns = document.querySelectorAll('.decreaseBtn');
  
  const itemQtyValues = document.querySelectorAll('.itemQtyValue');
  for(let i=0;i<increaseBtns.length;i++){
    let increaseBtn = increaseBtns[i];
    let qtyValue = itemQtyValues[i];
    increaseBtn.addEventListener('click',function(){
      qtyValue.value++;
      let newValue = qtyValue.value;
      let id = increaseBtn.id;
      axios.post('/api/myCart/update/qty',{newValue,id}).then(results=>{
        let response = results.data;
        let data = response.data;
        catalogueList.innerHTML = "";
        const template = Handlebars.compile(catalogueTemplate.innerHTML);
        catalogueList.innerHTML = template({
          cartItems: data
        }) 
      })
    })
  }
  for(let i=0;i<decreaseBtns.length;i++){
    let decreaseBtn = decreaseBtns[i];
    let qtyValue = itemQtyValues[i];
    decreaseBtn.addEventListener('click',function(){
      qtyValue.value--;
      let newValue = qtyValue.value;
      let id = decreaseBtn.id;
      axios.post('/api/myCart/update/qty',{newValue,id}).then(results=>{
        let response = results.data;
        let data = response.data;
        catalogueList.innerHTML = "";
        const template = Handlebars.compile(catalogueTemplate.innerHTML);
        catalogueList.innerHTML = template({
          cartItems: data
        })
      })
    })
  }
  }
  function remove(){
    const removeBtns = document.querySelectorAll('.removeBtn');
    for(let i=0;i<removeBtns.length;i++){
      let removeBtn = removeBtns[i];
      removeBtn.addEventListener('click',function(){
        let id = removeBtn.id;
        axios.get(`/api/myCart/update/product/delete/${id}`).then(results=>{
          let response = results.data;
          let data = response.data
          let template = Handlebars.compile(catalogueTemplate.innerHTML);
          catalogueList.innerHTML = template({
            cartItems:data
          })
          updateQty();
        })
      })
    }
   }
  displayPizzas();
  myCart();
  remove();
  updateQty();
  myMenuDetails();
});
        
      
