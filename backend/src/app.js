import express from "express";
import cors from "cors";
import router from "./routes/superhero.route.js";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/superheroes', router)

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
