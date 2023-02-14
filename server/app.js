const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { db } = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());

app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const errorMiddleware = require("./src/middleware/error");
const user = require("./src/modules/user/user.routes");
const form = require("./src/modules/form/form.routes");

dotenv.config();

// eslint-disable-next-line no-undef
const PORT = parseInt(process.env.PORT, 10);
const HOST = process.env.HOST || "localhost";

app.use(helmet());
const corsOption = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
};
app.use(cors(corsOption));

app.use("/api/v1", [user, form]);
app.use("/api/v1/static", express.static(`${__dirname}/uploads`));

app.use(errorMiddleware);

app.listen(PORT, HOST, () => {
  db();
  console.log(`Listening on port http://${HOST}:${PORT}`);
});
