import express, { application } from "express";
import pgPromise from "pg-promise";
import bodyParser from "body-parser";
import PizzaData from "./pizzaData.js";
import PizzaApi from "./API/pizza-api.js";
import PizzaRoutes from "./routes/pizzaRoutes.js";
import session from "express-session";
import flash from "express-flash";
import * as dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
const pgp = pgPromise();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://coder:pg123@localhost:5432/pizza_catalogue";

const config = {
  connectionString: DATABASE_URL,
};

if (process.env.NODE_ENV == "production") {
  config.ssl = {
    rejectUnauthorized: false,
  };
}

const db = pgp(config);

const app = express();
app.use(cookieParser());
app.use(express.json());
// app.use(cors());
app.use(
  session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
// app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static("public"));

const pizzaData = PizzaData(db);
const pizzaApi = PizzaApi(pizzaData);
const pizzaRoutes = PizzaRoutes(pizzaData);

app.post('/api/user/register',pizzaApi.register);
app.post('/api/user/login',pizzaApi.login);
app.get("/api/menu", pizzaApi.allPizzas);
app.get('/api/menu/fullMenu',pizzaApi.fullMenu);
app.get('/api/menu/:product',pizzaApi.pizza)
app.post('/api/addToCatalogue',pizzaApi.addPizza);
app.get('/api/myCart',pizzaApi.showMyCartItems);
app.post('/api/myCart/update/qty',pizzaApi.updateQty)
app.get(`/api/myCart/update/product/delete/:id`,pizzaApi.removeItem)
app.get("/api/checkOut",pizzaApi.checkAuth);
app.get('/api/total',pizzaApi.total);
app.get('/api/placeOrder',pizzaApi.placeOrder)

const port = process.env.PORT || 5012;
app.listen(port, function () {
  console.log("app started at port: ", port);
});
