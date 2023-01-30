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
    } catch (err) {
      console.log(err);
    }
  }
  //return
  return {
    getAllPizzas,
    addToCatalogue,
  };
}
      

