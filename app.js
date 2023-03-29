import cors from "cors";
import express from "express";
import useragent from "express-useragent";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import DB from "./db.config.js";

import { Authentication } from "./src/routes/auth.route.js";

dotenv.config();
const app = express();

let corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(useragent.express());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

DB.mongoose
    .connect(DB.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Database Connected");
    })
    .catch((error) => {
        console.log("Can't connect to database", error);
    });

app.get("/auth", (req, res) => {
    res.send({message: "!!! NODEJS AUTH API PLAYGROUND !!!"});
});

Authentication(app);

app.listen(process.env.PORT, () => {
    console.log(`App Running on: http://localhost:${process.env.PORT}`);
});