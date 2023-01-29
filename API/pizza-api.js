export default function (pizzaData) {
  async function allPizzas(req, res, next) {
    try {
      let results = await pizzaData.getAllPizzas();
      return res.json({
        data: results,
        status: "success",
      });
    } catch (err) {
      next(err);
    }
  }
  return {
    allPizzas,
  };
}
