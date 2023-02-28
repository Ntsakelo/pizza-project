import ShortUniqueId from "short-unique-id";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
let uid = new ShortUniqueId({ length: 5 });

export default function (pizzaData) {
  let id = uid();
  async function register(req,res,next){
   try{
       let username = req.body.firstName;
       let userLstName = req.body.lastName;
       let email = req.body.registerEmail;
       
       let firstName = username.charAt(0).toUpperCase() + username.slice(1);
       let lastName = userLstName.charAt(0).toUpperCase() + userLstName.slice(1);
       let password = await  bcrypt.hash(req.body.registerPassword,10);
       let results = await pizzaData.checkUser(firstName,lastName,email);
       
       if(results){
       return res.json({
          status: 'User already exists',
        })
       }else{
        await pizzaData.registerUser(firstName,lastName,email,password);
        res.json({
          status: 'Succesfully registered'
        })
       }
   }catch(err){
    next(err)
   }
  }
  async function login(req,res,next){
    try{
       let email = req.body.email;
       let password = req.body.password;
       let customer = await pizzaData.getUser(email);
       if(!customer){
        return res.json({
          status: "User does not have an account"
        })
       }
       else if(customer){
        let isPassword = await bcrypt.compare(password,customer.password);
        if(!isPassword){
          return res.json({
            status: "Password is incorrect!"
          })
        }
        const payLoad = {
          id: customer.id
        }
        const token = Jwt.sign(payLoad,`${process.env.SECRET_KEY}`,{expiresIn:'1d'});
        res.cookie("access_token",token,{httpOnly:true}).json({
          firstName: customer.firstname,
          status: `Welcome back ${customer.firstname}`
        })
       }
    }catch(err){
      next(err)
    }
  }
  async function allPizzas(req, res, next) {
    try {
      let results = await pizzaData.getAllPizzas();
      req.session.user = id;
      return res.json({
        data: results,
        status: "success",
      });
    } catch (err) {
      next(err);
    }
  }
  async function fullMenu(req,res,next){
    try{
      let results = await pizzaData.showAllMenu();
      res.json({
        data: results
      })
    }catch(err){
      next(err)
    }
  }
  async function pizza(req,res,next){
    try{
       let pizzaName = req.params.product;
       let results = await pizzaData.getPizza(pizzaName);
       res.json({
        data: results
       })
    }catch(err){
      next(err)
    }
  }
  async function addPizza(req,res,next){
    try{
        let productId = req.body.productId;
        let qty = req.body.qty;
        let selectedPrice = req.body.selectedPrice;
        let sessionId = req.session.user;
        let results = await pizzaData.addToCatalogue(productId, sessionId,selectedPrice, qty)
        res.json({
          data: results,
          status: 'success'
        })
    }catch(err){
      next(err)
    }
  }
  async function showMyCartItems(req,res,next){
    try{
      let sessionId = req.session.user;
         let results = await pizzaData.myCartItems(sessionId);
         res.json({
          data: results,
          status: 'success'
         })
    }catch(err){
      next(err)
    }
  }
  async function updateQty(req,res,next){
  try{
    let qty = req.body.newValue;
    let id = req.body.id;
    let sessionId = req.session.user
    let results = await pizzaData.updateItemQty(qty,id,sessionId);
     res.json({
      data: results,
      status:'success'

     })
  }catch(err){
    next(err)
  }
  }
  async function removeItem(req,res,next){
    try{
       let id = req.params.id;
       let sessionId = req.session.user
      let results = await pizzaData.removeFromCart(id,sessionId);
       res.json({
        data: results,
        status: "success",
       })
     
    }catch(err){
      next(err)
    }
  }
  async function total(req,res,next){
    try{
      let sessionId = req.session.user;
      let results = await pizzaData.cartTotal(sessionId);
      res.json({
        data: results
      })
    }
    catch(err){
      next(err)
    }
  }
  async function placeOrder(req,res,next){
    try{
     let sessionId = req.session.user;
     const token = req.cookies.access_token;
     if (!token) {
      return res.json({
        status: "No token found",
      });
    }
    Jwt.verify(token, `${process.env.SECRET_KEY}`,async function (err, userId) {
      if (err) {
        return res.json({
          status: "Invalid token",
        });
      }
     let results = await pizzaData.getUserById(userId.id);
     let firstName = results.firstname;
     let lastName = results.lastname;
     let email = results.email;
     await pizzaData.order(sessionId,firstName,lastName,email);
     res.json({
      status:"success"
     })
    })
    }catch(err){
      next(err)
    }
  }
 async function checkAuth(req, res, next) {
  try{
    const token = req.cookies.access_token;
    if (!token) {
      return res.json({
        status: "No token found",
      });
    }
    Jwt.verify(token, `${process.env.SECRET_KEY}`,async function (err, userId) {
      if (err) {
        return res.json({
          status: "Invalid token",
        });
      }
     let results = await pizzaData.getUserById(userId.id);
    return res.json({
      data: results,
      status:`Welcome back ${results.firstname}`
    })
    });

  }catch(err){
    next(err);

  }
}
  return {
    register,
    login,
    allPizzas,
    fullMenu,
    pizza,
    addPizza,
    showMyCartItems,
    updateQty,
    removeItem,
    total,
    placeOrder,
    checkAuth
  };
}
