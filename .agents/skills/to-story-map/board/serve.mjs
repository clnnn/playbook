// Serves the board at / and the session's map at /map.json. No dependencies.
//   node board/serve.mjs tmp/story-map/<slug>/map.json [port]
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const board = resolve(dirname(fileURLToPath(import.meta.url)), "index.html");
const map = resolve(process.argv[2] ?? "map.json");
const port = Number(process.argv[3] ?? 4321);

createServer(async (req, res) => {
  const wantsMap = req.url.split("?")[0] === "/map.json";
  try {
    const body = await readFile(wantsMap ? map : board);
    res.writeHead(200, {
      "content-type": wantsMap ? "application/json" : "text/html; charset=utf-8",
      "cache-control": "no-store",
    });
    res.end(body);
  } catch (err) {
    res.writeHead(404, { "content-type": "text/plain" }).end(String(err.message));
  }
}).listen(port, () => console.log(`board on http://localhost:${port} — reading ${map}`));
