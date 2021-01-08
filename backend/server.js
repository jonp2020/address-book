const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 9090;
const apiRouter = require("./routes/apiRouter");
const {
  handleInvalidPath,
  customErrorHandler,
  handle405Error,
  send500Error,
} = require("./errors/errors");

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter).all(handle405Error);

app.use("/*", handleInvalidPath);
app.use(customErrorHandler);
app.use(send500Error);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
