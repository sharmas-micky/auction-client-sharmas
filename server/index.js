//index.js
const express = require("express");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 4000;

const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

//Gets the JSON file and parse the file into JavaScript object
const rawData = fs.readFileSync("data.json");
const productData = JSON.parse(rawData);

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//Adding socket connection
socketIO.on("connection", (socket) => {
  //user connected
  console.log(`⚡: ${socket.id} user just connected!`);
  //user disconnected
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
  socket.on("addProduct", (data) => {
    productData["products"].push(data);
    const stringData = JSON.stringify(productData, null, 2);
    fs.writeFile("data.json", stringData, (err) => {
      console.error(err);
    });
    //Sends back the data after adding a new product
    socket.broadcast.emit("addProductResponse", data);
  });
  //Listens for new bids from the client
  socket.on("bidProduct", (data) => {
    console.log(data);
    findProduct(
      data.name,
      productData["products"],
      data.last_bidder,
      data.userInput
    );
    //Sends back the data after placing a bid
    socket.broadcast.emit("bidProductResponse", data);
  });
});
 
function findProduct(nameKey, productsArray, last_bidder, new_price) {
  for (let i =0; i < productsArray.length; i++) {
    if (productsArray[i].name === nameKey) {
      productsArray[i].last_bidder = last_bidder;
      productsArray[i].price = new_price;
    }
  }
  const stringData = JSON.stringify(productData, null, 2);
  fs.writeFile("data.json", stringData, (err) => {
    console.error(err);
  });
}

app.get("/api", (req, res) => {
  res.json(productData);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
