import express, { json } from "express";
import cards from "./routes/cards";
import cors from "cors";
const app = express();
app.use(json());
app.use(cors());
app.use("/", cards);

export default app;
