import { server } from "./app";
import { connectDB } from "./config/db";
import { initSockets } from "./sockets";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    const io = initSockets(server);
    server.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
});
