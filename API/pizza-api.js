import ShortUniqueId from "short-unique-id";
let uid = new ShortUniqueId({ length: 5 });

export default function (pizzaData) {
  let id = uid();
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
        await pizzaData.addToCatalogue(productId, sessionId,selectedPrice, qty)
        res.json({
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
    await pizzaData.updateItemQty(qty,id);
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
        status: "success"
       })
    }catch(err){
      next(err)
    }
  }
  return {
    allPizzas,
    addPizza,
    showMyCartItems,
    updateQty,
    removeItem
  };
}
