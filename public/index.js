document.addEventListener("DOMContentLoaded", function () {
  const smallScreenMenu = document.querySelector(".smallScreenMenu");
  const navBtn = document.querySelector(".navBtn");
  const closeBtn = document.querySelector(".closeBtn");
  const userPage = document.querySelector(".user");
  const loginSection = document.querySelector(".login");
  const registerSection = document.querySelector(".register");
  const showRegister = document.querySelector(".goToRegister");
  const registrationState = document.querySelector('.registrationState')
  const showLogin = document.querySelectorAll(".goToLogin");
  const navLinks = document.querySelectorAll(".navLink");
  const userBtn = document.querySelectorAll(".profile");
  const catalogueSection = document.querySelector('.catalogueSection');
  const main = document.querySelector('.main');
  const cartBtn = document.querySelector('.shoppingCart');
  const homeLink = document.querySelector('.goHome');
  const goTochckOutBtn = document.querySelector('.goTochckOutBtn');
  const deliverySection = document.querySelector('.deliverySection');
  const closeDelivery = document.querySelector('#closeDelivery');
  const proceedBtn = document.querySelector('.proceedBtn');
  const confirmSection = document.querySelector('.confirmSection');
  // const homeSection = document.querySelector('.homeSection');
  // const container = document.querySelector('.container');
  // const navigation = document.querySelector('.topBar'); 
  const deliveryMethod = document.querySelectorAll('.delivery');
  // const deliveryDetails = document.querySelectorAll('.deliveryDetails');
  const formContent = document.querySelector('.deliveryFormContent');
  const cardNumber = document.querySelector('.cardNumber')
  const masterCardLogo = document.querySelector('.masterCardLogo');
  const visaCardLogo = document.querySelector('.visaCardLogo');
  const cartCount = document.querySelector('.cartCount')
 
  
 //console.log(container.scrollTop)
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

  showLogin.forEach(btn=>{
    btn.addEventListener("click", function () {
      loginSection.classList.remove("hide");
      loginSection.classList.add("show");
      registerSection.classList.remove("show");
      registerSection.classList.add("hide");
      registrationState.classList.remove('show');
      registrationState.classList.add('hide');
    });

  })

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
    if(Number(cartCount.innerHTML) === 0){
      goTochckOutBtn.setAttribute('style','cursor:not-allowed');
    }
    else{
      goTochckOutBtn.setAttribute('style','cursor:pointer')
    }
    main.classList.remove('show');
    main.classList.add('hide');
    catalogueSection.classList.remove('hide');
    catalogueSection.classList.add('show');
    registrationState.classList.add('hide');
  })
  goTochckOutBtn.addEventListener('click',function(){
    if(Number(cartCount.innerHTML) === 0){
      return;
    }
    axios.get("/api/checkOut").then(results=>{
      let response = results.data;
      let data = response.status;
      if(data === "No token found" || data === "Invalid token"){
          catalogueSection.classList.remove('show');
          catalogueSection.classList.add('hide');
          userPage.classList.remove("hide");
          userPage.classList.add("show");    
      }
      else{
        catalogueSection.classList.remove('show');
        catalogueSection.classList.add('hide');
        deliverySection.classList.remove('hide');
        deliverySection.classList.add('show');
      }
    })
  })
  closeDelivery.addEventListener('click',function(){
    deliverySection.classList.remove('show');
    deliverySection.classList.add('hide');
    catalogueSection.classList.remove('hide');
    catalogueSection.classList.add('show');
  })
  proceedBtn.addEventListener('click',function(){
    deliverySection.classList.remove('show');
    deliverySection.classList.add('hide');
    confirmSection.classList.remove('hide');
    confirmSection.classList.add('show');
  })
  deliveryMethod.forEach(method=>{
    method.addEventListener('click',function(){
      if(method.value === "pickup"){
        formContent.classList.remove('show')
        formContent.classList.add('hide');
      }else{
        formContent.classList.remove('hide')
        formContent.classList.add('show')
      }
    })
  })
  cardNumber.oninput = function(){
   if(cardNumber.value.length === 4 && cardNumber.value.startsWith(5)){
      visaCardLogo.classList.remove('show')
      visaCardLogo.classList.add('hide')
      masterCardLogo.classList.remove('hide');
      masterCardLogo.classList.add('show');
   }
   else if(cardNumber.value.length === 4 && cardNumber.value.startsWith(4)){
     masterCardLogo.classList.add('hide');
     masterCardLogo.classList.remove('show')
     visaCardLogo.classList.remove('hide')
     visaCardLogo.classList.add('show')
   }
  else if(cardNumber.value.length === 0){
     masterCardLogo.classList.remove('show');
     masterCardLogo.classList.add('hide');
     visaCardLogo.classList.add('hide');
     visaCardLogo.classList.remove('show')
   }
  }
  //server side
  const registerBtn = document.querySelector('.registerBtn');
  const loginBtn = document.querySelector('.loginBtn');
  const menuTemplate = document.querySelector(".menuTemplate");
  const pizzaList = document.querySelector(".pizzaList");
  const catalogueTemplate = document.querySelector('.catalogueTemplate')
  const catalogueList = document.querySelector('.catalogueList');
  const itemSubTotal = document.querySelector('.itemSubTotal');
  const subTotals = document.querySelector('.subTotals');
  const total = document.querySelector('.TOTAL');
  const errMsgs = document.querySelectorAll('.errMsg')
  const loginError = document.querySelector('.loginError');
  const registerError = document.querySelector('.registerError');



  
  function hideErrMsg(){
    errMsgs.forEach(msg=>{
      msg.setAttribute('style','display:none')
    })
  }
  hideErrMsg();
  function register(){
    const firstNameFilled = document.querySelector('.firstName');
    const lastNameFilled = document.querySelector('.lastName');
    const registerEmailFilled = document.querySelector('.registerEmail');
    const registerPasswordFilled = document.querySelector('.registerPassword');
    registerBtn.addEventListener('click',function(){
      let firstName = firstNameFilled.value.toLowerCase();
      let lastName = lastNameFilled.value.toLowerCase();
      let registerEmail = registerEmailFilled.value.toLowerCase();
      let registerPassword = registerPasswordFilled.value.toLowerCase();
      if(!firstName || !lastName || !registerEmail || !registerPassword){
         registerError.setAttribute('style','display:block');
         registerError.innerHTML = "Please enter all details";
         setTimeout(hideErrMsg,3000);
         return
      }
      axios.post('/api/user/register',{firstName,lastName,registerEmail,registerPassword}).then(results =>{
         let response = results.data;
         let data = response.status;
         if(data === "Succesfully registered"){
          registrationState.classList.remove('hide');
          registrationState.classList.add('show');
          return;
         }
         else if(data !== "Succesfully registered"){
         registerError.setAttribute('style','display:block');
         registerError.innerHTML = data;
         setTimeout(hideErrMsg,10000);
         }
      })
      firstNameFilled.value = "";
      lastNameFilled.value = "";
      registerEmailFilled.value = "";
      registerPasswordFilled.value = "";
    })
  }
  
  function login(){
    const loginEmailFilled = document.querySelector('.loginEmail');
    const loginPasswordFilled = document.querySelector('.loginPassword')
    
    loginBtn.addEventListener('click',function(){
      let email = loginEmailFilled.value;
      let password = loginPasswordFilled.value;
      if(!email || !password){
         loginError.setAttribute('style','display:block');
         loginError.innerHTML = "Please enter all details";
         setTimeout(hideErrMsg,3000);
         return
      }
      axios.post('/api/user/login',{email,password}).then(results =>{
         let response = results.data;
         let data = response.status;
         console.log(data)
      })

    })
  }
  function displayPizzas() {
    axios.get("/api/menu").then((results) => {
      let response = results.data;
      let data = response.data;
      let template = Handlebars.compile(menuTemplate.innerHTML);
      pizzaList.innerHTML = template({
        item: data,
      });
      const pizzaPrices = document.querySelectorAll(".price");
      pizzaPrices.forEach((price) => {
        if (price.classList.contains("smallPrice")) {
          price.classList.add("currentPrice");
        }
      });
      myMenuDetails();
    });
  }
  let itemTot;
  function myMenuDetails() {
    let selectedPrice = "";
    let productId = "";
    let qty = 1;
    const addButtons = document.querySelectorAll(".addToBasketBtn");
    const pizzaPrices = document.querySelectorAll(".price");
    pizzaPrices.forEach((price) => {
      price.addEventListener("click", function () {
        selectedPrice = Number(price.id);
   
      });
    });
    addButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        productId = btn.id;
        subTotals.innerHTML = "";
        axios.post('/api/addToCatalogue',{productId,selectedPrice,qty}).then(results=>{
          let response = results.data;
          let data = response.data;
          let totAmnt = 0
            cartCount.innerHTML = data.length;
           data.forEach(item=>{
            let itemPrice = Number(item.price)
            subTotals.innerHTML += `<div class='itemSubTotal'><p class='item' id=${item.product}>${item.product} X${item.qty}</p>
            <p class='subTotal' id=${item.id}>R${itemPrice.toFixed(2)}</p></div>`;
            totAmnt += Number(item.price);
            total.innerHTML = `R${totAmnt}`
          })
          const subTotal = document.querySelectorAll('.subTotal')
          itemTot = subTotal;
        })
      });
    });
  }
  function myCart(){
    cartBtn.addEventListener('click',function(){
      axios.get('/api/myCart').then(results=>{
        let response = results.data;
        let data = response.data;
        let template = Handlebars.compile(catalogueTemplate.innerHTML);
        catalogueList.innerHTML = template({
          cartItems: data
        })
       
        updateQty();
        remove();
      })
    })
  }
  function updateQty(){
   const items = document.querySelectorAll('.item');
   const subTotal = document.querySelectorAll('.subTotal')
  const increaseBtns = document.querySelectorAll('.increaseBtn');
  const decreaseBtns = document.querySelectorAll('.decreaseBtn');
  const itemPrices = document.querySelectorAll('.itemPrice');
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
        let itemsTotal = 0;
        let currentItem = data.filter(item=>{
          if(item.id === Number(id)){
            return item
          }
        })
        let itemPrice = Number(currentItem[0].price)
        itemPrices[i].innerHTML = `R${itemPrice.toFixed(2)}`
        for(let i=0;i<itemTot.length;i++){
          if(itemTot[i].id == currentItem[0].id){
            itemTot[i].innerHTML = `R${itemPrice.toFixed(2)}`;
          }
        }
        data.forEach(item=>{
           itemsTotal += Number(item.price);
           total.innerHTML = "";
          total.innerHTML += `R${itemsTotal.toFixed(2)}`;
        })
    
      })
    })
  }
  for(let i=0;i<decreaseBtns.length;i++){
    let decreaseBtn = decreaseBtns[i];
    let qtyValue = itemQtyValues[i];
    decreaseBtn.addEventListener('click',function(){
      qtyValue.value--;
      if(qtyValue.value <= 1){
        qtyValue.value = 1;
      }
      let newValue = qtyValue.value;
      let id = decreaseBtn.id;
      axios.post('/api/myCart/update/qty',{newValue,id}).then(results=>{
        let response = results.data;
        let data = response.data;
        let itemsTotal = 0;
        let currentItem = data.filter(item=>{
          if(item.id === Number(id)){
            return item
          }
        })
        let itemPrice = Number(currentItem[0].price)
        itemPrices[i].innerHTML = `R${itemPrice.toFixed(2)}`
        for(let i=0;i<itemTot.length;i++){
          if(itemTot[i].id == currentItem[0].id){
            itemTot[i].innerHTML = `R${itemPrice.toFixed(2)}`;
          }
        }
        data.forEach(item=>{
          itemsTotal += Number(item.price);
          total.innerHTML = "";
         total.innerHTML += `R${itemsTotal.toFixed(2)}`;
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
        axios.get('/api/myCart').then(results=>{
        let response = results.data;
        let data = response.data;
        let template = Handlebars.compile(catalogueTemplate.innerHTML);
        catalogueList.innerHTML = template({
        cartItems: data
     })
      let totAmnt = 0
           subTotals.innerHTML = "";
           if(data.length <= 0){
            total.innerHTML = "R0.OO"
           }
           data.forEach(item=>{
            subTotals.innerHTML += `<div class='itemSubTotal'><p class='item' id=${item.product}>${item.product} X${item.qty}</p>
            <p class='subTotal' id=${item.id}>R${item.price}</p></div>`;
            totAmnt += Number(item.price);
            total.innerHTML = `R${totAmnt.toFixed(2)}`
          })
          const subTotal = document.querySelectorAll('.subTotal')
          itemTot = subTotal;
     updateQty();
     remove();
   })
   updateQty();
   remove();
       })
   
      })
    }
  }
  let detailsList = {};
  function deliveryDetails(){
   proceedBtn.addEventListener('click',function(){
     const deliveryName = document.querySelector('.deliveryName').value;
     const deliveryLastName = document.querySelector('.deliveryLastName').value;
  const deliveryContacts = document.querySelector('.deliveryContacts').value;
  const deliveryAddress = document.querySelector('.deliveryAddress').value;
  const deliveryTown = document.querySelector('.deliveryUnit').value;
  const deliveryZip = document.querySelector('.deliveryZip').value;
   detailsList = {
    recipientName:deliveryName,
    recipientLstName: deliveryLastName,
    contacts: deliveryContacts,
    address: deliveryAddress,
    town: deliveryTown,
    zipCode: deliveryZip
  };
  // detailsList.push(deliveryName,deliveryLastName,deliveryContacts,deliveryAddress,deliveryUnit,deliveryZip);
  return detailsList;
   }) 
  }
  //
  displayPizzas();
   myMenuDetails();
  myCart();
  register();
  login();
  deliveryDetails();
 });
    

  

        
    
        
      
