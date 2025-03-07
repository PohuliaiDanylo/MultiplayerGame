import { app } from "./app";
import { connectDB } from "./config/db";
const PORT = process.env.PORT || process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
});
