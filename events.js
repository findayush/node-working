const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
//const myEmitter = new EventEmitter();
const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("Sales done");
});
myEmitter.on("newSale", () => {
  console.log("Client: Ayush");
});
myEmitter.on("newSale", (count) => {
  console.log(`Items Sold ${count}`);
});
myEmitter.emit("newSale", 5);

//////////////////////////////////server////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request here");
  console.log(req.url);
  res.end("API data here");
});

server.listen(8080, "127.0.0.1", () => {
  console.log("Listening...");
});
