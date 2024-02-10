import dotenv from "dotenv";
import express from "express";
import userRouter from "../src/Routers/userRouter";

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/users", userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
