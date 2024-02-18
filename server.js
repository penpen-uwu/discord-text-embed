const http = require("http");
const pureimage = require("pureimage");
const fs = require("fs");

fs.rmSync("images", { recursive: true, force: true });
fs.mkdirSync("images");

const font = pureimage.registerFont("Roboto-Regular.ttf", "Roboto");
font.loadSync();

const hostname = "0.0.0.0";
const port = 3000;

const img = pureimage.make(1000, 1000);
ctx = img.getContext("2d");
ctx.font = "40px Roboto";
ctx.textBaseline = "top";

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url == "/") {
    res.setHeader("Content-Type", "text/plain");
    res.end("no text");
    return;
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "image/png");

  text = decodeURI(req.url.slice(1));
  ctx.fillStyle = "cyan";
  ctx.fillRect(0, 0, 1000, 1000);
  ctx.fillStyle = "black";
  ctx.fillText(text, 0, 0);
  metrics = ctx.measureText(text);

  fileName = "images/" + Math.floor(Math.random() * 100000000) + ".png";
  pureimage.encodePNGToStream(img, fs.createWriteStream(fileName)).then(() => {
    res.end(fs.readFileSync(fileName));
    fs.unlinkSync(fileName);
  }).catch((err) => {
    console.log(err.message);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
