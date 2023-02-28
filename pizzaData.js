export default function pizzaData(db) {
  async function checkUser(firstName,lastName,email){
    try{
        let results = await db.oneOrNone('select * from customers where firstname = $1 and lastname = $2 and email = $3',[firstName,lastName,email]);
        return results
    }catch(err){
     console.log(err)
    }
  }
  async function registerUser(firstName,lastName,email,password){
    try{
       await db.none('insert into customers(firstname,lastname,email,password)values($1,$2,$3,$4)',[firstName,lastName,email,password]);
    }catch(err){
      console.log(err)
    }
  }
  async function getUser(email){
    try{
       let results = await db.oneOrNone('select * from customers where email = $1',[email]);
       return results;
    }catch(err){
      console.log(err)
    }
  }
  async function getUserById(userId){
    try{
      return await db.oneOrNone('select * from customers where id=$1',[userId])
    }
    catch(err){
      console.log(err)
    }
  };
  async function getAllPizzas() {
    try {
      return await db.manyOrNone("select * from products limit 6");
    } catch (err) {
      console.log(err);
    }
  }
  async function showAllMenu(){
    try{
     return await db.manyOrNone('select * from products')
    }catch(err){
      console.log(err)
    }
  }
  async function getPizza(pizzaName){
    try{
      return await db.oneOrNone('select * from products where product=$1',[pizzaName]);
    }catch(err){
      console.log(err)
    }
  }
  async function addToCatalogue(productId, sessionId,selectedPrice, qty) {
    try {
      let priceList = await db.oneOrNone(
        "select small_price,medium_price,large_price from products where id = $1",
        [productId]
      );
      let size = "";
      let price = selectedPrice;
      let itemPriceList = [Number(priceList.small_price),Number(priceList.medium_price),Number(priceList.large_price)]
     for(let i=0;i<itemPriceList.length;i++){
       if(price === itemPriceList[i] && price < itemPriceList[i+1] && price < itemPriceList[i+2]){
         size = "Small"
       }
       if(price > itemPriceList[i] && price === itemPriceList[i+1] && price < itemPriceList[i+2]){
         size = "Medium"
       }
       if(price > itemPriceList[i] && price > itemPriceList[i+1] && price === itemPriceList[i+2]){
         size = "Large"
       }
      }
      await db.none(
        "insert into catalogue(product_id,session_id,size, price, qty) values($1,$2,$3,$4,$5)",
        [productId, sessionId, size,price, qty]
      );
      return await db.manyOrNone('select catalogue.id,product,price,catalogue.qty,size,image_url from products join catalogue on products.id = catalogue.product_id where session_id =$1 order by catalogue.id desc',[sessionId]);
    } catch (err) {
      console.log(err);
    }
  }
  async function myCartItems(sessionId){
    try{
      return await db.manyOrNone('select catalogue.id,product,price,catalogue.qty,size,image_url from products join catalogue on products.id = catalogue.product_id where session_id =$1 order by catalogue.id desc',[sessionId]);

    }catch(err){
      console.log(err)
    }
  }
  async function updateItemQty(newValue,id,sessionId){
    try{
      await db.none('update catalogue set qty = $1 where id=$2',[newValue,id]);
      let results = await db.oneOrNone('select qty from catalogue where id=$1',[id]);
      let productPrices = await db.oneOrNone('select small_price,medium_price,large_price from products join catalogue on products.id = catalogue.product_id where catalogue.id=$1 order by catalogue.id desc',[id]);
      let results2 = await db.oneOrNone('select size from catalogue where id=$1',[id]);
      let productPrice = 0;
        if(results2.size === "Small"){
           productPrice = productPrices.small_price
        }
        if(results2.size === "Medium"){
          productPrice = productPrices.medium_price
       }
       if(results2.size === "Large"){
        productPrice = productPrices.large_price
     }
       let newPrice = results.qty * productPrice;
        await db.none('update catalogue set price = $1 where id=$2',[newPrice,id]);
        return await db.manyOrNone('select catalogue.id,product,price,catalogue.qty,size,image_url from products join catalogue on products.id = catalogue.product_id where session_id =$1 order by catalogue.id desc',[sessionId]);
    }catch(err){
      console.log(err)
    }
  }
  async function removeFromCart(id,sessionId){
    try{
      await db.none('delete from catalogue where id=$1',[id]);
      return await db.manyOrNone('select catalogue.id,product,price,catalogue.qty,size,image_url from products join catalogue on products.id = catalogue.product_id where session_id =$1 order by catalogue.id desc',[sessionId]);
    }catch(err){
      console.log(err)
    }
  }
  async function cartTotal(sessionId){
    try{
      let results = await db.manyOrNone('select * from catalogue where session_id = $1',[sessionId]);
      let total = 0;
      results.forEach(item=>{
        total += Number(item.price);
      })
      return total;
    }catch(err){
      console.log(err)
    }
  }
  async function order(sessionId,firstName,lastName,email){
    try{
      let results = await db.manyOrNone('select * from catalogue join products on catalogue.product_id = products.id where session_id = $1',[sessionId]);
      console.log(results);
      let customer = await db.oneOrNone('select id from customers where firstname = $1 and lastname = $2 and email = $3',[firstName,lastName,email]);
      // let currentdate = new Date();
      results.forEach(async item=>{
        await db.none('insert into orders(customer_id,product,qty,price,order_status) values($1,$2,$3,$4,$5)',[customer.id,item.product,item.qty,item.price,'processing']);
      })
      await db.none('delete from catalogue where session_id = $1',[sessionId]);
    }
    catch(err){
      console.log(err)
    }
  }
  //return
  return {
    checkUser,
    registerUser,
    getUser,
    getUserById,
    getAllPizzas,
    showAllMenu,
    getPizza,
    addToCatalogue,
    myCartItems,
    updateItemQty,
    removeFromCart,
    cartTotal,
    order,
  };
}
      

