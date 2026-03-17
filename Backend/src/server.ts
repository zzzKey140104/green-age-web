import cors from "cors";
import express from "express";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => res.status(200).json({ ok: true }));
app.use("/api", apiRoutes);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`API listening on http://localhost:${env.PORT}`);
});
