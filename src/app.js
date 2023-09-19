import Server from "./server.js";
import mainRoute from "./routes/mainRoute.js";

const server = new Server();

server.use(mainRoute);
server.start();
