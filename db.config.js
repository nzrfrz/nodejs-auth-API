import dotenv from "dotenv";
import mongoose from "mongoose";

import { User } from "./src/models/user.model.js";

dotenv.config();

const MONGO_DB_URL = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;

let db = {};
db.mongoose = mongoose;
db.url = MONGO_DB_URL;

db.user_credentials = User(mongoose);

const DB = db;

export default DB;