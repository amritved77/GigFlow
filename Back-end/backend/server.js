import http from "http";
import { initSocket } from "./config/socket.js";

const server = http.createServer(app);

initSocket(server); // 🔥 REQUIRED

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

