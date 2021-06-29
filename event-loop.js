const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 4;

fs.readFile("./test-file.txt", () => {
  console.log("I/O finished");
  console.log("--------------Event loop callbacks------------------------");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));
  //   the event loop actually waits for stuff to happen in the poll phase where I/O callbacks are handled.
  // So when this queue of callbacks is empty,which is the case in our example here, so we have no I/O callbacks,
  // all we have is these timers, well then the event loop will wait in this phase until there is an expired timer.
  // But if we scheduled a callback using setImmediate, then that callback will actually be executed
  // right away after the polling phase, and even before expired timers, if there is one.
  // And in this case, the timer expires right away, so after zero seconds, but again, the event loop
  // actually waits, so it pauses in the polling phase. And so that setImmediate callback
  // is actually executed first, so that is the whole reason why we have this immediate here after we have the timers.
  process.nextTick(() => console.log("process.nextTick()"));
  console.log("next to pnt");
  //crypto operations goes to threadpool from eventloop
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password encrypted Sync");

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password encrypted Sync");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password encrypted Sync");

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password encrypted Sync");
});
setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));
console.log("Hello from top level code");
