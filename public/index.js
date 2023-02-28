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
  const itemViewing = document.querySelector('.ItemViewing');
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
  const cartCount = document.querySelector('.cartCount');

 //console.log(container.scrollTop)
//  Referral object
// let pageReferral = {
//   currentPage: "https://mama's pizza.com/home",
//   previousPage: "",
// };
  navBtn.addEventListener("click", function () {
    if (userPage.classList.contains("show") || itemViewing.classList.contains('show')) {
      userPage.classList.remove("show");
      userPage.classList.add("hide");
      itemViewing.classList.remove('show');
      itemViewing.classList.add('hide');
    }
    fullMenu.classList.remove('show');
    fullMenu.classList.add('hide');
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
    main.classList.remove('hide');
    main.classList.add('show');
    fullMenu.classList.remove('show');
    fullMenu.classList.add('hide');
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
      if (userPage.classList.contains("show") || itemViewing.classList.contains('show')) {
        userPage.classList.remove("show");
        userPage.classList.add("hide");
        itemViewing.classList.remove('show');
        itemViewing.classList.add('hide');
        main.classList.remove('hide');
        main.classList.add('show');
      }
      fullMenu.classList.remove('show');
      fullMenu.classList.add('hide');
      main.classList.remove('hide');
      main.classList.add('show');
    });
  });
  userBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (smallScreenMenu.classList.contains("showMenu") || itemViewing.classList.contains('show')) {
        itemViewing.classList.remove('show');
        itemViewing.classList.add('hide');
        smallScreenMenu.classList.remove("showMenu");
        smallScreenMenu.classList.add("hideMenu");
        navBtn.setAttribute("style", "display:block");
        closeBtn.setAttribute("style", "display:none");
      }
      userPage.classList.remove("hide");
      userPage.classList.add("show");
      fullMenu.classList.remove('show');
      fullMenu.classList.add('hide');
    });
  });
  homeLink.addEventListener('click',function(){
    if(userPage.classList.contains('show')){
      userPage.classList.remove('show');
      userPage.classList.add('hide');
    }
    catalogueSection.classList.remove('show');
    catalogueSection.classList.add('hide');
    main.classList.remove('hide');
    main.classList.add('show');
    fullMenu.classList.remove('show');
    fullMenu.classList.add('hide');
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
    itemViewing.classList.remove('show');
    itemViewing.classList.add('hide');
    fullMenu.classList.remove('show');
    fullMenu.classList.add('hide');
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
  const fullMenuTemplate = document.querySelector('.fullMenuTemplate');
  const fullMenu = document.querySelector('.fullMenu');
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
         setTimeout(hideErrMsg,10000);
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
      // myMenuDetails();
       viewPizza();
       viewFullMenu();
    });
  }
  function viewFullMenu(){
    const viewFullMenuBtn = document.querySelector('.viewFullMenuBtn');
    viewFullMenuBtn.addEventListener('click',function(){
      axios.get('/api/menu/fullMenu').then(results=>{
      let response = results.data;
      let data = response.data;
      let template = Handlebars.compile(fullMenuTemplate.innerHTML);
      fullMenu.innerHTML = template({
        item: data,
      });
      viewPizza();
      main.classList.remove('show');
      main.classList.add('hide');
      fullMenu.classList.remove('hide');
      fullMenu.classList.add('show');
      })
    })
  }
  let itemTot;
  function viewPizza(){
   const allPizzas = document.querySelectorAll('.pizza');
   const pizzaTemplate = document.querySelector('.pizzaTemplate');
   allPizzas.forEach(pizza=>{
     pizza.addEventListener('click',function(){
      //  alert(pizza.id)
      axios.get(`/api/menu/${pizza.id}`).then(results=>{
        let response = results.data;
        let data = response.data;
        let pizzaList = [];
        pizzaList.push(data);
        let template = Handlebars.compile(pizzaTemplate.innerHTML);
        itemViewing.innerHTML = template({
          pizza: pizzaList
        })
        myMenuDetails();
         closePizzaViewing();
        if(fullMenu.classList.contains('show')){
          fullMenu.classList.remove('show');
          fullMenu.classList.add('hide');
        }
        main.classList.remove('show');
        main.classList.add('hide');
        itemViewing.classList.remove('hide');
        itemViewing.classList.add('show');
      })
     })
     
   })
  }
  function closePizzaViewing(){
     const backToMenu = document.querySelector('.backToMenu');
     backToMenu.addEventListener('click',function(){
      itemViewing.classList.remove('show');
      itemViewing.classList.add('hide');
      main.classList.remove('hide');
      main.classList.add('show');
     })
  }
  function myMenuDetails() {
    let selectedPrice = "";
    let productId = "";
    let qty = 1;
    const addButton = document.querySelector(".addToBasketBtn");
    const pizzaPrices = document.querySelectorAll(".price");
    pizzaPrices.forEach((price) => {
      price.addEventListener("click", function () {
        selectedPrice = Number(price.id);
   
      });
    });
    // addButtons.forEach((btn) => {
      addButton.addEventListener("click", function () {
        productId = addButton.id;
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
    // });
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
            total.innerHTML = "R0.00"
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
  let details = {};
  function deliveryDetails(){
   proceedBtn.addEventListener('click',function(){
    axios.get('/api/total').then(results=>{
      let response = results.data;
      let data = response.data;
      console.log(data);
      const confirmTemplate = document.querySelector('.confirmTemplate');
      const confirmSection = document.querySelector('.confirmSection')
      const deliverOption = document.querySelector('.deliver');
      const pickUpOption = document.querySelector('.pickup');
      const deliveryName = document.querySelector('.deliveryName').value;
      const deliveryLastName = document.querySelector('.deliveryLastName').value;
      const deliveryContacts = document.querySelector('.deliveryContacts').value;
      const deliveryAddress = document.querySelector('.deliveryAddress').value;
      const deliveryTown = document.querySelector('.deliveryUnit').value;
      const deliveryZip = document.querySelector('.deliveryZip').value;
      const cardNumber2 = document.querySelector('.cardNumber').value;
      const cardExpiry = document.querySelector('.cardExpiry').value;
      const cvvNumber = document.querySelector('.ccvNumber').value;
      const cardHolder = document.querySelector('.cardHolder').value;
      let detailsList = [];
      let paymentNtwrkImage = "";
 
     if(deliverOption.checked){
       if(cardNumber2.startsWith(5)){
          paymentNtwrkImage = "./images/MasterCard_Logo.svg.png";
       }
       else if(cardNumber2.startsWith(4)){
         paymentNtwrkImage = "./images/visa-logo-800x450.jpg"; 
       }
       let deliveryAmnt = 50;
       details = {
        recipientName:deliveryName,
        recipientLstName: deliveryLastName,
        contacts: deliveryContacts,
        address: deliveryAddress,
        town: deliveryTown,
        zipCode: deliveryZip,
        cardNumber: cardNumber2,
        cardExpiry: cardExpiry,
        cvv: cvvNumber,
        cardOwner: cardHolder, 
        ntwrkImage: paymentNtwrkImage,
        method:'delivery',
        deliverAmount:"R" + deliveryAmnt.toFixed(2),
        itemsAmount: "R" + data.toFixed(2),
        totalAmount: "R" + ((data + 50.00).toFixed(2))
      };
      detailsList.push(details);
   } 
     else if(pickUpOption.checked){
       if(cardNumber2.startsWith(5)){
          paymentNtwrkImage = "./images/MasterCard_Logo.svg.png";
       }
       else if(cardNumber2.startsWith(4)){
         paymentNtwrkImage = "./images/visa-logo-800x450.jpg"; 
       }
      details = {
        recipientName:'N/A',
        recipientLstName: 'N/A',
        contacts: 'N/A',
        address: 'Not Applicable',
        town: '',
        zipCode: '',
        cardNumber: cardNumber2,
        cardExpiry: cardExpiry,
        cvv: cvvNumber,
        cardOwner: cardHolder, 
        ntwrkImage: paymentNtwrkImage,
        method:"pickup",
        deliverAmount: 'N/A',
        itemsAmount: "R" + data.toFixed(2),
        totalAmount: "R" + data.toFixed(2),
      };
      detailsList.push(details);
     }
     const template = Handlebars.compile(confirmTemplate.innerHTML);
     confirmSection.innerHTML = template({
       details:detailsList,
     })
     completedOrder();
    }) 
  })
}
function completedOrder(){
  const orderBtn = document.querySelector('.orderBtn');
  const completedSection = document.querySelector('.completedSection')
  orderBtn.addEventListener('click',function(){
    axios.get('/api/placeOrder').then(results=>{
      confirmSection.classList.remove('show');
      confirmSection.classList.add('hide');
      completedSection.classList.remove('hide');
      completedSection.classList.add('show');

    })
  })
}
//
  displayPizzas();
  //  myMenuDetails();
  
  myCart();
  register();
  login();
  deliveryDetails();
 });
    

  

        
    
        
      
