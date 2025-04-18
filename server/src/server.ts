import { server } from "./app";
import { connectDB } from "./config/db";
import { initSockets } from "./sockets";
import { client, subscriber } from "./config/redis"

const PORT = process.env.PORT || 3000;

connectDB().then(async () => {
    initSockets(server);
    try {
        await client.connect()
        await subscriber.connect()
        console.log('✅ Connected to Redis');
    } catch (err) {
        console.error('❌ Redis connection failed:', err);
    }
    server.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
});
