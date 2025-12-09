import express from "express";
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();
const PORT = process.env.PORT || 3000

await connectDB()
connectCloudinary()
app.use(express.json())
app.use(cors())


app.use('/api/admin',adminRouter)

app.get("/", (req, res) => {
  res.send("Backend Connected");
});
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
