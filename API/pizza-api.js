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
  return {
    allPizzas,
    addPizza
  };
}
