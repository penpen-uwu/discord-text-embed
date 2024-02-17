const fs = require("fs");
const http = require("http");
const pureimage = require("pureimage");
const sharp = require("sharp");

const font = pureimage.registerFont("Roboto-Regular.ttf", "Roboto");
font.loadSync();

const hostname = "0.0.0.0";
const port = 3000;

const img = pureimage.make(1000, 1000);
ctx = img.getContext("2d");
ctx.fillStyle = "black";
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
  ctx.clearRect(0, 0, 1000, 1000);
  ctx.fillText(text, 0, 0);
  metrics = ctx.measureText(text);

  // pureimage.encodePNGToStream(img, fs.createWriteStream("out.png")).then(() => {
  //     sharp("out.png").extract({
  //         left: 0,
  //         top: 0,
  //         width: Math.ceil(metrics.width - 2) + 1,
  //         height: Math.ceil(metrics.emHeightAscent - metrics.emHeightDescent - 2) + 1
  //     }).toFile("out-new.png").then(() => {
  //         res.end(fs.readFileSync("out-new.png"));
  //         fs.unlinkSync("out.png");
  //         fs.unlinkSync("out-new.png");
  //     })
  // })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
