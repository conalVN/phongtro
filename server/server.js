const express = require("express");
const cors = require("cors");
import initRoutes from "./src/routes";
import connectDatabase from "./src/config/connectDatabase";

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"], // chi nhan request cua 4 method nay
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

initRoutes(app);
app.use("", (req, res) => {
  res.json("server on");
});
connectDatabase();

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
  console.log(`Server is running on port ${listener.address().port}`);
});
