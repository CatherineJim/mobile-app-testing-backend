const dotEnv = require("dotenv");

dotEnv.config({ path: "./env/config.env" });
const connection = require("./db/connection");
const app = require("./app");
connection();

const port = process.env.PORT || 3000;
// app.listen(port, () => {
app.listen(port, () => {
  console.log(`server is running on ${port} port!`);
});
