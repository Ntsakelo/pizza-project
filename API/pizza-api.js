import ShortUniqueId from "short-unique-id";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
let uid = new ShortUniqueId({ length: 5 });

export default function (pizzaData) {
  let id = uid();
  async function register(req,res,next){
   try{
       let firstName = req.body.firstName;
       let lastName = req.body.lastName;
       let email = req.body.registerEmail;
       console.log(firstName,lastName,email);
       let password = await  bcrypt.hash(req.body.registerPassword,10);
       let results = await pizzaData.checkUser(firstName,lastName,email,password);
       if(Number(results.count > 0)){
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
          status: "User not registered yet!"
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
  return {
    register,
    login,
    allPizzas,
    addPizza,
    showMyCartItems,
    updateQty,
    removeItem
  };
}
