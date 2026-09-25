const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = process.argv[2];
const PORT = parseInt(process.argv[3] || "4321", 10);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".png": "image/png", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".json": "application/json",
  ".webmanifest": "application/manifest+json",
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  let fp = path.join(ROOT, urlPath);
  try {
    if (fs.existsSync(fp) && fs.statSync(fp).isDirectory()) {
      fp = path.join(fp, "index.html");
    }
    if (!fs.existsSync(fp)) {
      const custom = path.join(ROOT, "404.html");
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(fs.existsSync(custom) ? fs.readFileSync(custom) : "404 Not Found");
      return;
    }
    const ext = path.extname(fp).toLowerCase();
    res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream" });
    res.end(fs.readFileSync(fp));
  } catch (e) {
    res.writeHead(500);
    res.end("500 " + e.message);
  }
}).listen(PORT, "127.0.0.1", () => {
  console.log("serving " + ROOT + " at http://localhost:" + PORT + "/");
});
