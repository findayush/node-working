const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //Solution 1
  //   fs.readFile("./test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });

  //Solution 2 - Streams
  //   const readable = fs.createReadStream("./test-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end(); // we already sent data using res.write chunk by chunk
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found");
  //   });

  //Problem with Solution 2is that response cannot send the data nearly as fast as it is receiving it from file -backpressure

  //Solution 3
  const readable = fs.createReadStream("./test-file.txt");
  readable.pipe(res); // readableSource.pipe(writableDestination)
});

server.listen(9800, "127.0.0.1", () => {
  console.log("Listening. . .");
});
