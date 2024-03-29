import { createServer } from "./server.js";
import { log } from "logger";

const port = process.env.PORT || 3001;
const server = createServer();

server.listen(port, () => {
  log(`api running on ${port}`);
});
