import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRouter.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/OrderRoute.js";
import adminRoutes from "./routes/adminRoutes.js";

//app config
const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json()); // for parsing application/json from the client

// db connections
connectDB(process.env.MONGO_URL);

//api endpoints
app.use("/api/food", foodRouter); //use by admin

app.use("/images", express.static("uploads")); // serve static files from the uploads directory
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Hello World! This is the server running on port " + PORT);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
