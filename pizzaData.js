export default function pizzaData(db) {
  async function getAllPizzas() {
    try {
      return await db.manyOrNone("select * from products limit 6");
    } catch (err) {
      console.log(err);
    }
  }
  return {
    getAllPizzas,
  };
}
