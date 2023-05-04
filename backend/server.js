require("dotenv").config(); //kết nối cấu hình .env
const express = require("express");
const app = express();
const db = require("./db/index");
const PORT = 3000;
const cors = require("cors");
const cookie = require("cookie-parser");
db.connect();
app.use(express.json()); //Cho phép dùng kiểu JSON
app.use(cookie());
app.use(
  cors({
    credentials: true, //trao đổi với cooki
    origin: ["http://localhost:3001"],
  })
);

const subscribersRouter = require("./routes/subscribers.js");
const usersRouter = require("./routes/users.js");
const contactsRouter = require("./routes/contacts.js");
const productsRouter = require("./routes/products.js");
const categoriesRouter = require("./routes/categories.js");
app.use("/api/contacts", contactsRouter);
app.use("/subscribers", subscribersRouter); //Gọi tới localhost:3000/subscribers gọi tới router
app.use("/users", usersRouter); //Gọi tới localhost:3000/users gọi tới router
app.use("/products", productsRouter); //Gọi tới localhost:3000/users gọi tới router
app.use("/categories", categoriesRouter); //Gọi tới localhost:3000/users gọi tới router
app.listen(PORT, function (err) {
  if (err) console.log(err);
  else {
    console.log(`Ket noi cong ${PORT}`);
  }
});
