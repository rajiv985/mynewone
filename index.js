import connectDB from "./src/DB/mongoose.connect.js";
import app from "./app.js";
import 'dotenv/config' 
// for server connection 
const PORT = 3000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});  