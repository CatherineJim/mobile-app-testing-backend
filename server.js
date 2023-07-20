const dotEnv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotEnv.config({ path: "./env/config.env" });
const connection = require("./db/connection");
const app = require("./app");
const findMatch = require("./util/findMatch");
connection();

// Initializing express app, server and io
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     // origin: "http://localhost:19000",
//     origin: "*",
//     // methods: "GET,POST,PATCH,DELETE",
//     // credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("A new client connected");

//   // Event fired when a rider or traveler shares their details
//   socket.on("share_details", async (data) => {
//     const matchedData = await findMatch(data, maxDistance);
//   });

//   // Event fired when the client disconnects
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // server.listen(port, () => {
  console.log(`server is running on ${port} port!`);
});
