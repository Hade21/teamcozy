import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import postsRouter from "./routes/posts";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/posts", postsRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI: string =
  "mongodb+srv://adminTeamCozy:sgiaWdPhjBYpl4R2@teamcozy.wjmezvi.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`[server] server running at port ${PORT}`)
    );
  })
  .catch((error) => console.log(error));
