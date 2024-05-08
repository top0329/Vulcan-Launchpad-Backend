import express, { Express } from "express";
import cors from "cors";
import Moralis from "moralis";

import user from "./routes/api/user";
import utils from "./routes/api/utils";
import invest from "./routes/api/invest";

import connectDB from "./lib/dbConnect";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();
const port: Number = process.env.PORT ? Number(process.env.PORT) : 5050;

const path = require("path");

connectDB();
app.set("trust proxy", true);

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/static", express.static(__dirname + "/public"));

app.use("/api/user", user);
app.use("/api/ico/invest", invest);
app.use("/api/utils", utils);


async function startServer () {
  try {
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    });
    console.log("moralis start....");
  
    app.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    });
  } catch (err) {
    console.log(err)
  }
}

startServer ();


