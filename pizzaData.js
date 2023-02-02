export default function pizzaData(db) {
  async function getAllPizzas() {
    try {
      return await db.manyOrNone("select * from products limit 6");
    } catch (err) {
      console.log(err);
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
  //return
  return {
    getAllPizzas,
    addToCatalogue,
    myCartItems,
    updateItemQty,
    removeFromCart,
  };
}
      

